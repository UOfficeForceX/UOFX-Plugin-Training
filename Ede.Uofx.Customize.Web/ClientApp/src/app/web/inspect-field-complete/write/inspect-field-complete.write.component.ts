import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UofxDialogController, UofxDialogOptions } from '@uofx/web-components/dialog';
import { BpmFwWriteComponent, UofxFormFieldLogic, UofxFormTools, UofxValidators } from '@uofx/web-components/form';
import { ProductListCompleteComponent } from './_dialog/product-list-complete/product-list-complete.component';
import { NorthWindService } from '@service/northwind.service';
import { Settings, UofxConsole } from '@uofx/core';
import { UofxUserSetItemType, UofxUserSetPluginHelper } from '@uofx/web-components/user-select';
import { UofxFilePluginService } from '@uofx/web-components/file';
import { environment as env } from '@env/environment';
import { InspectFieldExProps } from '@model/inspect-field.model';

@Component({
  selector: 'app-inspect-field-complete.write',
  templateUrl: './inspect-field-complete.write.component.html',
  styleUrl: './inspect-field-complete.write.component.scss'
})
export class InspectFieldCompleteWriteComponent extends BpmFwWriteComponent implements OnInit, OnChanges {

  /** 屬性資料 */
  @Input() exProps: InspectFieldExProps;
  /** 表單 */
  form: FormGroup;
  /** 公司ID */
  corpId = Settings.UserInfo.corpId;
  /** 選人元件類別 */
  types: Array<UofxUserSetItemType> = [UofxUserSetItemType.DeptEmployee];
  /** 取得PluginCode */
  pluginCode = env.manifest.code;

  /** 檢驗結果選項 */
  inspResults = [
    { name: '通過', code: 'PASSED' },
    { name: '不通過', code: 'FAILED' },
    { name: '需複驗', code: 'RETEST' }
  ];

  constructor(private fb: FormBuilder,
    private tools: UofxFormTools,
    private fieldLogic: UofxFormFieldLogic,
    private dialogCtrl: UofxDialogController,
    private northWindServ: NorthWindService,
    private userSetHelper: UofxUserSetPluginHelper,
    private filePluginServ: UofxFilePluginService
  ) {
    super();
  }

  ngOnChanges() {
    /**
     * 屬性變更時，更新檢驗數量預設值
     * 僅於表單已初始化時更新
     */
    if (this.form) {
      this.form.controls['inspQuantity'].setValue(this.exProps.defaultQuantity);
    }
  }

  ngOnInit() {
    /** 設定伺服器位址 */
    this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
    this.initForm();
    /** 同步父子表單 */
    if(this.selfControl) this.fieldUtils.syncParentFormStatusToInnerForm(this.form);
    /**
     * 訂閱表單值變更，設定值給 selfControl
     * 用於跨欄取值與欄位計算
     */
    this.form.valueChanges.subscribe({
      next: res => {
        this.selfControl?.setValue(res);
        this.selfControl?.updateValueAndValidity();
      }
    });
  }

  /** 初始化表單 */
  initForm() {
    this.form = this.fb.group({
      comment: ['', [Validators.required, UofxValidators.notAllowedSpaceString]],
      inspQuantity: [this.exProps?.defaultQuantity ?? 0, [Validators.required, Validators.min(1)]],
      inspResult: [null],
      inspProduct: [null, Validators.required],
      inspDate: [null],
      inspector: [null],
      inspReport: [null]
    })
    this.setFormValue();
  }

  /** 填入表單資料 */
  setFormValue() {
    if (this.value) {
      this.form.controls.comment.setValue(this.value.comment);
      this.form.controls.inspQuantity.setValue(this.value.inspQuantity);
      this.form.controls.inspResult.setValue(this.value.inspResult);
      this.form.controls.inspProduct.setValue(this.value.inspProduct);
      this.form.controls.inspDate.setValue(this.value.inspDate);
      this.form.controls.inspector.setValue(this.value.inspector);
      this.form.controls.inspReport.setValue(this.value.inspReport);
    } else {
      /** 填入選人元件預設值 */
      this.userSetHelper.getUserSetByType(
        UofxUserSetItemType.DeptEmployee, [{ deptCode: 'deptCode', account: 'account' }]
      ).subscribe({
        next: res => {
          this.form.controls.inspector.setValue(res);
        }
      })
    }
  }

  /** 開窗顯示商品列表 */
  showDialog() {
    this.dialogCtrl.create(<UofxDialogOptions>{
      component: ProductListCompleteComponent,
      size: 'large',
      params: { data: this.form.controls.inspProduct.value }
    }).afterClose.subscribe({
      next: res => {
        if (res) this.form.controls.inspProduct.setValue(res);
      }
    })
  }

  /** 清除選擇檢驗產品 */
  clearProduct() {
    this.form.controls.inspProduct.setValue(null);
  }

  /** 表單送出、暫存前會呼叫此函式做檢查 */
  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      // 真正送出欄位值變更的函式
      this.valueChanges.emit(this.form.value);
      // 設定 FormGroup 的驗證狀態
      this.tools.markFormGroup(this.form);
      // 若不需驗證，清除 form control error
      this.fieldLogic.checkValidators(checkValidator, this.selfControl, this.form);
      // 提交檔案
      if (this.form.controls.inspReport.value) {
        this.filePluginServ.submitFile(this.form.controls.inspReport.value).subscribe({
          next: res => {
            UofxConsole.log("已提交");
          }
        })
      }
      // 若不需檢查驗證，直接回傳 true
      if (!checkValidator) return resolve(true);
      resolve(this.form.valid);
    });
  }
}
