# 步驟 4：外掛欄位基本設定

## 實作

### 1. 修改 `inspect-field.model.ts`

定義 `InspectFieldFillModel` 的欄位屬性：

```typescript
/** 填寫 model */
export interface InspectFieldFillModel {
  /** 評語 */
  comment: string;
  /** 檢驗數量 */
  inspQuantity: number;
  /** 檢驗結果 */
  inspResult: string;
}
```

### 2. 修改 `inspect-field.write.component.ts`

調整 import，引入表單與欄位邏輯工具：

```typescript
import { BpmFwWriteComponent, UofxValidators, UofxFormTools, UofxFormFieldLogic } from '@uofx/web-components/form';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
```

注入 `UofxFormTools` 和 `UofxFormFieldLogic` 服務：

```typescript
constructor(
  private fb: FormBuilder,
  private tools: UofxFormTools,
  private fieldLogic: UofxFormFieldLogic) {
  super();
}
```

初始化加入同步父層表單狀態：

```typescript
ngOnInit(): void {
  this.initForm();
  this.fieldUtils.syncParentFormStatusToInnerForm(this.form);
}
```

> 說明：`syncParentFormStatusToInnerForm` 讓外掛欄位的內部 FormGroup 與外層表單狀態同步（例如送出時觸發驗證）。

在檔案底部新增自訂驗證函式，並於 `initForm()` 中設定 selfControl 的驗證器，讓 selfControl 可同步內部 FormGroup 的驗證狀態：

```typescript
function validateSelf(form: FormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return form.valid ? null : { formInvalid: true };
  }
}
```

`initForm()` 新增 selfControl 設定與回填資料：

```typescript
initForm() {
  this.form = this.fb.group({
    comment: [null, [Validators.required, UofxValidators.notAllowedSpaceString]],
    inspQuantity: [null, [Validators.required, Validators.min(1)]],
    inspResult: [null]
  })

  if (this.selfControl) {
    this.selfControl.setValidators(validateSelf(this.form));
    this.selfControl.updateValueAndValidity();
  }

  this.setFormValue();
}

setFormValue(){
  if(this.value){
    this.form.controls.comment.setValue(this.value.comment);
    this.form.controls.inspQuantity.setValue(this.value.inspQuantity);
    this.form.controls.inspResult.setValue(this.value.inspResult);
  }
}
```

實作 `checkBeforeSubmit()`，處理欄位值送出與驗證邏輯：

```typescript
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
```

### 工具與方法說明

| 工具/方法 | 說明 |
|-----------|------|
| `UofxFormTools.markFormGroup` | 將 FormGroup 內所有控制項標記為 dirty/touched，觸發顯示驗證錯誤 |
| `UofxFormFieldLogic.checkValidators` | 根據是否需要驗證，清除或保留 form control 的 error |
| `fieldUtils.syncParentFormStatusToInnerForm` | 同步父層表單狀態到內部 FormGroup |
| `selfControl.setValidators` | 將自訂驗證器綁定到 selfControl |
| `valueChanges.emit` | 將欄位填寫的值送出儲存至 UOF X |
