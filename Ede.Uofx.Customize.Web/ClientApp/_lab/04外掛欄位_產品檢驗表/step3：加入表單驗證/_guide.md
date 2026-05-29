# 步驟 3：加入表單驗證（FormGroup + Validators）

## 實作

### 1. 修改 `inspect-field.module.ts`

新增 `UofxFormModule`（提供 `uofx-form-error-tip` 元件）：

```typescript
import { UofxFormFieldBaseModule, UofxFormModule } from '@uofx/web-components/form';
```

加入 `UOF_MODULES`：

```typescript
const UOF_MODULES = [
  UofxFormFieldBaseModule,
  UofxFormModule,
  InputTextModule,
  InputNumberModule,
  DropdownModule
];
```

### 2. 修改 `inspect-field.write.component.ts`

調整 import，引入表單相關模組與驗證器：

```typescript
import { BpmFwWriteComponent, UofxValidators } from '@uofx/web-components/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
```

新增 `form: FormGroup` 屬性，並調整下拉選項：

```typescript
form: FormGroup;

options = [
  { name: '通過', code: 'PASSED' },
  { name: '不通過', code: 'FAILED' },
  { name: '需複驗', code: 'RETEST' }
];
```

建構子注入 `FormBuilder`：

```typescript
constructor(private fb: FormBuilder) {
  super();
}
```

初始化呼叫 `initForm()`，建立表單控制項與驗證規則：

```typescript
ngOnInit(): void {
  this.initForm();
}

initForm() {
  this.form = this.fb.group({
    comment: [null, [Validators.required, UofxValidators.notAllowedSpaceString]],
    inspQuantity: [null, [Validators.required, Validators.min(1)]],
    inspResult: [null]
  })
}
```

使用的驗證器說明：

| 驗證器 | 說明 |
|--------|------|
| `Validators.required` | Angular 內建，欄位為必填，值為 null / undefined / 空字串時驗證失敗 |
| `UofxValidators.notAllowedSpaceString` | UOF X 提供，不允許只輸入空白字元的字串 |
| `Validators.min(1)` | Angular 內建，數值最小值為 1，小於此值時驗證失敗 |

更多 UOF X 提供驗證與說明請參考手冊：
- [共用驗證 - U-Office Force X 開發手冊](https://docs.uof.tw/techdoc/v2026R1.128/plugin/web-components/validators/)
- [錯誤訊息 - U-Office Force X 開發手冊](https://docs.uof.tw/techdoc/v2026R1.128/plugin/web-components/error-message/)

### 3. 修改 `inspect-field.write.component.html`

在 `<table>` 加上 `[formGroup]="form"`，將各欄位綁定 `formControlName`，並加上錯誤提示元件：

```html
<table [formGroup]="form">
  <tr>
    <th><span>Title1</span></th>
    <td><span>Content1</span></td>
    <th><span>Title2</span></th>
    <td><span>Content2</span></td>
  </tr>
  <tr>
    <th><span>Title3</span></th>
    <td colspan="3"><span>Content3</span></td>
  </tr>
  <tr>
    <th><span [attr.uofx-required]="editable ? true : null">評語</span></th>
    <td colspan="3">
      <input pInputText formControlName="comment"/>
      <uofx-form-error-tip [control]="form.controls.comment"></uofx-form-error-tip>
    </td>
  </tr>
  <tr>
    <th><span [attr.uofx-required]="editable ? true : null">檢驗數量</span></th>
    <td colspan="3">
      <p-inputNumber formControlName="inspQuantity"></p-inputNumber>
      <uofx-form-error-tip [control]="form.controls.inspQuantity" rangeText="檢驗數量不可為 0"></uofx-form-error-tip>
    </td>
  </tr>
  <tr>
    <th><span>檢驗結果</span></th>
    <td colspan="3">
      <p-dropdown formControlName="inspResult" [options]="options" optionLabel="name" optionValue="code"
      styleClass="width-100" filter="true" filterBy="name"></p-dropdown>
    </td>
  </tr>
</table>
```

> 說明：
> - `[attr.uofx-required]`：根據 `editable` 狀態顯示必填星號
> - `<uofx-form-error-tip>`：自動顯示對應欄位的驗證錯誤訊息
> - `rangeText`：自訂範圍驗證的錯誤文字
