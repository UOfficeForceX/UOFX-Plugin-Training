import { Component, Input, OnInit } from '@angular/core';
import { BpmFwWriteComponent, UofxValidators, UofxFormTools, UofxFormFieldLogic } from '@uofx/web-components/form';
import { InspectFieldPropModel, InspectFieldFillModel } from '@model/inspect-field.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UofxDialogController, UofxDialogOptions } from '@uofx/web-components/dialog';
import { ProductListComponent } from './_dialog/product-list/product-list.component';
import { NorthWindService } from '@service/northwind.service';

/**
 * InspectField 欄位填寫元件
 *
 * 用於表單填寫時的輸入介面
 */
@Component({
  selector: 'uofx-inspect-field-write',
  templateUrl: './inspect-field.write.component.html',
  styleUrls: ['./inspect-field.write.component.scss']
})
export class InspectFieldWriteComponent extends BpmFwWriteComponent implements OnInit {
  @Input() exProps: InspectFieldPropModel;
  /** 填寫 model */
  value: InspectFieldFillModel;
  form: FormGroup;

  options = [
    { name: '通過', code: 'PASSED' },
    { name: '不通過', code: 'FAILED' },
    { name: '需複驗', code: 'RETEST' }
  ];

  constructor(
    private fb: FormBuilder,
    private tools: UofxFormTools,
    private fieldLogic: UofxFormFieldLogic,
    private dialogCtrl: UofxDialogController,
    private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit(): void {
    // 程式碼進入點
    this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
    this.initForm();
    this.fieldUtils.syncParentFormStatusToInnerForm(this.form);
  }

  initForm() {
    this.form = this.fb.group({
      comment: [null, [Validators.required, UofxValidators.notAllowedSpaceString]],
      inspQuantity: [null, [Validators.required, Validators.min(1)]],
      inspResult: [null],
      inspProduct: [null]
    })

    if (this.selfControl) {
      this.selfControl.setValidators(validateSelf(this.form));
      this.selfControl.updateValueAndValidity();
    }

    this.setFormValue();
  }

  setFormValue() {
    if (this.value) {
      this.form.controls.comment.setValue(this.value.comment);
      this.form.controls.inspQuantity.setValue(this.value.inspQuantity);
      this.form.controls.inspResult.setValue(this.value.inspResult);
      this.form.controls.inspProduct.setValue(this.value.inspProduct);
    }
  }

  showDialog() {
    this.dialogCtrl.create(<UofxDialogOptions>{
      component: ProductListComponent,
      size: 'large',
      params: { data: this.form.controls.inspProduct.value },
    }).afterClose.subscribe({
      next: res => {
        if (res) this.form.controls.inspProduct.setValue(res);
      }
    });
  }

  clearProduct() {
    this.form.controls.inspProduct.setValue(null);
  }


  /** 表單送出前檢查（必須實作） */
  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    return new Promise(resolve => {
      // 真正送出欄位值變更的函式
      this.valueChanges.emit(this.form.getRawValue());
      // 設定 FormGroup 的驗證狀態
      this.tools.markFormGroup(this.form);
      // 若不需驗證，清除 form control error
      this.fieldLogic.checkValidators(checkValidator, this.selfControl, this.form);
      // 若不需檢查驗證，直接回傳 true
      if (!checkValidator) return resolve(true);
      // 檢查驗證且表單驗證不通過時，不可送出表單
      resolve(this.form.valid);
    });
  }
}

// BpmFwWriteComponent
function validateSelf(form: FormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return form.valid ? null : { formInvalid: true };
  }
}
