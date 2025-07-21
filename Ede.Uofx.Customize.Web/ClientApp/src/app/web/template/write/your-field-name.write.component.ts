import { Component, Input, OnInit, } from "@angular/core";
import { BpmFwWriteComponent, UofxFormFieldLogic, UofxFormTools } from "@uofx/web-components/form";
import { Settings } from '@uofx/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NorthWindService } from "@service/northwind.service";
import { EmployeeService } from "@service/employee.service";

@Component({
  selector: 'uofx-your-field-write',
  templateUrl: './your-field-name.write.component.html',
  styleUrls: ['./your-field-name.write.component.scss']
})

export class TemplateWriteComponent extends BpmFwWriteComponent implements OnInit {

  /** 屬性資料 */
  // @Input() exProps: YourFieldExProps;

  /** 登入者公司id */
  corpId = Settings.UserInfo.corpId;
  /** form group */
  form: FormGroup;
  /** 填寫model */
  // value: YourFieldModel;
  /** 錯誤訊息 */
  errorMessage = [];

  constructor(
    private fb: FormBuilder,
    private tools: UofxFormTools,
    private empService: EmployeeService,
    private fieldLogic: UofxFormFieldLogic,
    private northWindServ: NorthWindService
  ) {
    super();
  }

  ngOnInit() {
    //呼叫api之前要設定serverUrl為外掛欄位站台位址
    this.empService.serverUrl = this.pluginSetting?.entryHost;

    this.initForm();

    // 訂閱parent form的status changes，送出時，一併顯示欄位內整張form的錯誤訊息
    this.fieldLogic.parentFormBinding(this.parentForm, this.selfControl, this.form);
  }

  /** 初始化form */
  initForm() {
    this.form = this.fb.group({
      yourField: [this.value?.yourField, [Validators.required]],
    });
    this.setFormValue();
  }

  /** 填入資料 */
  setFormValue() {
    if (this.value) {
      this.form.controls.yourField.setValue(this.value.yourField);
    }
  }

  /**
   * 表單送出前會呼叫此函式做檢查
   * @param {boolean} checkValidator 按下表單下方按鈕時是否要檢查表單驗證
   * @return {*}  {Promise<boolean>}
   */
  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    this.errorMessage = [];
    this.tools.markFormGroup(this.form);
    // 真正送出欄位值變更的函式
    this.valueChanges.emit(this.form.value);

    return new Promise(resolve => {

      const formValue = this.form.value;
      console.log('checkBeforeSubmit', formValue);

      // 放在checkBeforeSubmit中，如果是暫存就不需要驗證必填，且清除form control error
      this.fieldLogic.checkValidators(checkValidator, this.selfControl, this.form);

      if (checkValidator) {

        if (this.form.invalid) return resolve(false);

      } else {
        resolve(true);
      }

    });
  }
}
