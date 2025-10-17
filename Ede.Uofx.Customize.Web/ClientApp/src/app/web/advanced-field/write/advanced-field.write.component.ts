import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BpmFwWriteComponent, UofxFormFieldLogic, UofxFormTools, UofxValidators } from '@uofx/web-components/form';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { EmployeeService } from '@service/employee.service';
import { NorthWindService } from '@service/northwind.service';
import { Settings, UofxConsole } from '@uofx/core';
import { UofxPluginApiService } from '@uofx/plugin/api';
import { UofxToastController } from '@uofx/web-components/toast';
import { UofxPluginBeforeUserSetDeptModel, UofxPluginBeforeUserSetEmplModel, UofxPluginBeforeUserSetModel, UofxUserSetItemType, UofxUserSetPluginHelper } from '@uofx/web-components/user-select';
import { AdvancedFieldExProps, AdvancedFieldModel } from '@model/advanced.model';
import { CustomerModel } from '@model/northwind.model';
import { SdkService } from '@service/sdk.service';
import { ApplyFormResModel, CallbackResultModel } from '@model/sdk.model';
import { UofxFilePluginService } from '@uofx/web-components/file';
import { environment as env } from '@env/environment';

/**
 * 驗證行動電話的格式
 * @returns
 */
export function createMobileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    //驗證輸入10碼數字
    const validNumber = /^[0-9]{10}$/.test(value);
    return !validNumber ? { invalidMobile: true } : null;
  }
}

/**
 * 驗證申請的日期是否超出屬性設定的天數
 */
export function createApplyDateValidator(days: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const today = new Date();
    const applyDateVal = new Date(value);
    if (isNaN(applyDateVal.getTime())) {
      return null;
    }
    const timeDiff = Math.abs(applyDateVal.getTime() - today.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays > days ? { invalidApplyDate: true } : null;
  }
}

@Component({
  selector: 'uofx-advanced-field-props',
  templateUrl: './advanced-field.write.component.html',
  styleUrls: ['./advanced-field.write.component.scss']
})
export class AdvancedFieldWriteComponent extends BpmFwWriteComponent implements OnInit, OnDestroy {
  /** 屬性資料 */
  @Input() exProps: AdvancedFieldExProps;

  /** 登入者公司id */
  corpId = Settings.UserInfo.corpId;
  /** form group */
  form: FormGroup;
  /** 填寫model */
  value: AdvancedFieldModel;
  /** 錯誤訊息 */
  errorMessage = [];
  /** 員工編號 */
  empNo: string;
  /** 選人員件限制-僅選人 */
  userSelectTypes: Array<UofxUserSetItemType> = [UofxUserSetItemType.DeptEmployee];
  /** SDK callback結果 **/
  callbackResult: Array<CallbackResultModel>;
  /** SDK結果是否載入中 **/
  sdkResultLoading = true;
  /** 外部起單-申請者帳號 */
  sdkAccount: string;
  /** 外部起單-申請者部門代號 */
  sdkDeptCode: string;
  /** 外部起單-附件完整檔案路徑 **/
  sdkFilePath: string;
  /** pluginCode */
  pluginCode = env.manifest.code;

  constructor(
    private fb: FormBuilder,
    private tools: UofxFormTools,
    private pluginService: UofxPluginApiService,
    private empService: EmployeeService,
    private toastCtrl: UofxToastController,
    private fieldLogic: UofxFormFieldLogic,
    private northWindService: NorthWindService,
    private sdkService: SdkService,
    private userSetHelper: UofxUserSetPluginHelper,
    private fileHelper: UofxFilePluginService
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.fieldUtils.destroySubscriptions();
  }

  ngOnInit(): void {
    //呼叫api之前要設定serverUrl為外掛欄位站台位址
    this.empService.serverUrl = this.pluginSetting?.entryHost;
    UofxConsole.log('=== AdvancedFieldWriteComponent ===');
    UofxConsole.log('checkBeforeSubmit-entryHost =', this.pluginSetting?.entryHost);

    this.toastCtrl.saved();
    this.initForm();

    UofxConsole.log('欄位屬性:', this.exProps);
    UofxConsole.log('填寫的值:', this.value)
    UofxConsole.log('表單變數:', this.taskNodeInfo.variables)
    this.pluginUtils.getTargetFieldValue('Reason').then(res => {
      UofxConsole.log('取得欄位代號為 Reason 的欄位資料:', res);
    });

    this.loadInfo();
    // this.getCutomerInfo();
    // this.addCustomer();
    // this.updateCustomer();

    // 訂閱parent form的status changes，送出時，一併顯示欄位內整張form的錯誤訊息
    this.fieldUtils.syncParentFormStatusToInnerForm(this.form);

    this.form.valueChanges.subscribe({
      next: res => {
        // 更新每次的value結果，為了跨欄位存取使用。
        this.selfControl.setValue(res);
        // 使用情境說明：
        // 當需要與系統中的數值欄位進行運算，且 this.selfControl.value 為物件型別時，
        // 系統會自動將物件轉為字串，這可能會影響驗證結果，
        // 此時需使用 this.selfControl.updateValueAndValidity() 來更新驗證狀態。
        this.selfControl.updateValueAndValidity();
      }
    });
  }

  /** 新增資料 */
  addCustomer() {
    const postModel = <CustomerModel>{
      customerId: 'demo1',
      companyName: 'demo1 company',
    };
    this.northWindService.addCustomer(postModel).subscribe({
      next: res => {
        UofxConsole.log('AdvancedFieldWriteComponent addCustomer 新增客戶', res);
      }
    });
  }

  /** 更新資料 */
  updateCustomer() {
    const putModel = <CustomerModel>{
      customerId: 'RANCH',
      companyName: 'update!!!!'
    };
    this.northWindService.updateCustomer(putModel).subscribe({
      next: res => {
        UofxConsole.log('AdvancedFieldWriteComponent updateCustomer 更新客戶', res);
      }
    });
  }

  /** 取得資料 */
  getCutomerInfo() {
    this.northWindService.getCustomerById('PICCO').subscribe({
      next: res => {
        UofxConsole.log('AdvancedFieldWriteComponent getCutomerInfo 取得客戶資料', res);
      }
    });
  }

  /** 初始化form */
  initForm() {
    this.form = this.fb.group({
      'account': null,
      'empNo': [null, Validators.required],
      'mobile': [null, Validators.required],
      'applyDate': [null, Validators.required],
      'agent': [null, Validators.required],
      'count': null,
      'attachments': null
    });

    this.setFormValue();

    // 表單送出時驗證
    if (this.selfControl) {
      // 在此便可設定自己的驗證器
      this.selfControl.setValidators(validateSelf(this.form));
      this.selfControl.updateValueAndValidity();
    }
  }

  /** 填入資料 */
  setFormValue() {
    if (this.value) {
      this.form.controls.empNo.setValue(this.value.empNo);
      this.form.controls.mobile.setValue(this.value.mobile);
      this.form.controls.applyDate.setValue(this.value.applyDate);
      this.form.controls.agent.setValue(this.value.agent);
      this.form.controls.count.setValue(this.value.count);
      this.form.controls.attachments.setValue(this.value.attachments);
    } else {
      // 如果沒有填寫值，則設定預設值
      // this.userSetHelper.getUserSetByType(UofxUserSetItemType.Empl, ['account1', 'account2'])
      //   .subscribe({
      //     next: res => {
      //       this.form.controls.agent.setValue(res);
      //     }
      //   });
    }
  }

  /**
   * 表單送出前會呼叫此函式做檢查
   * @param {boolean} checkValidator 按下表單下方按鈕時是否要檢查表單驗證
   * @return {*}  {Promise<boolean>}
   */
  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    this.errorMessage = [];
    // 真正送出欄位值變更的函式
    this.valueChanges.emit(this.form.getRawValue());
    this.tools.markFormGroup(this.form);
    return new Promise(resolve => {

      const formValue = this.form.value;
      UofxConsole.log('AdvancedFieldWriteComponent checkBeforeSubmit', formValue);
      this.fileHelper.submitFile(this.form.controls.attachments.value).subscribe({
        next: () => {
          UofxConsole.log('已提交');
        }
      });


      // 放在checkBeforeSubmit中，如果是暫存就不需要驗證必填，且清除form control error
      this.fieldLogic.checkValidators(checkValidator, this.selfControl, this.form);

      if (checkValidator) {

        if (this.form.invalid) return resolve(false);
        this.checkValidEmpNo(formValue, resolve);

      } else {
        resolve(true);
      }

    });
  }

  /** 驗證員編 */
  checkValidEmpNo(formValue, resolve) {
    this.empService.getValidEmpNumber().subscribe({
      next: res => {
        UofxConsole.log('=== AdvancedFieldWriteComponent checkValidEmpNo ===');

        if (res?.includes(formValue.empNo)) {
          UofxConsole.log('有效的員編', res);
          this.errorMessage = [];
          resolve(true);
        } else {
          this.errorMessage.push('無效的員工編號');
          UofxConsole.log('errormsg', this.errorMessage);
          resolve(false);
        }
      }
    });
  }

  /** 取得員工資訊 */
  loadInfo() {
    UofxConsole.log('=== AdvancedFieldWriteComponent loadInfo ===');
    this.pluginService.getUserInfo(this.taskNodeInfo.applicantId).subscribe({
      next: (empInfo) => {
        UofxConsole.log('員工資訊', empInfo);
        this.form.controls.account.setValue(empInfo.account);
      },
      error: () => {
        UofxConsole.log('無法取得員工資訊');
      },
      complete: () => {
        return Promise.resolve(true);
      }
    });
  }

  //#region SDK相關

  /** 點擊外部起單按鈕 */
  onApplyFormClick() {
    if (!this.sdkAccount || !this.sdkDeptCode) {
      this.toastCtrl.errorToast('請先設定申請者帳號與部門代號');
      return;
    }

    const applyFormModel = <ApplyFormResModel>{
      account: this.sdkAccount,
      deptCode: this.sdkDeptCode,
      customData: new Date().toLocaleString(),
      filePath: this.sdkFilePath
    };
    UofxConsole.log('=== AdvancedFieldWriteComponent onApplyFormClick ===');

    this.sdkService.applyForm(applyFormModel).subscribe({
      next: res => {
        UofxConsole.log('外部起單成功', res);
        // 查詢結果
        this.onGetResultClick();
      }, error: err => {
        UofxConsole.log('外部起單失敗', err);
      }
    });
  }

  /** 取得起單後callback結果 */
  onGetResultClick() {
    this.sdkResultLoading = true;
    this.sdkService.getCallbackResult().subscribe({
      next: res => {
        this.callbackResult = res;
        this.sdkResultLoading = false;
      }, error: err => {
        UofxConsole.log('無法取得callback結果', err);
        this.sdkResultLoading = false;
      }
    });
  }

  //#endregion
}

// BpmFwWriteComponent
function validateSelf(form: FormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return form.valid ? null : { formInvalid: true };
  }
}
