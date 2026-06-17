# 步驟 7：共用元件 - 日期、選人元件

## 實作

### 1. 修改 `inspect-field.model.ts`

新增 import 及欄位定義：

```typescript
import { UofxUserSetModel } from "@uofx/web-components/user-select";

export interface InspectFieldFillModel {
  // ...existing
  /** 檢驗日期 */
  inspDate: Date;
  /** 檢驗人員 */
  inspector: Array<UofxUserSetModel>;
}
```

### 2. 修改 `inspect-field.module.ts`

新增 import：

```typescript
import { UofxDatePickerModule } from '@uofx/web-components/date-picker';
import { UofxUserSelectModule, UofxUserSetPluginHelper, UofxUserSetPluginService } from "@uofx/web-components/user-select";
import { UofxToastModule } from '@uofx/web-components/toast';
```

加入 `UOF_MODULES`：

```typescript
const UOF_MODULES = [
  // ...existing
  UofxDatePickerModule,
  UofxUserSelectModule,
  UofxToastModule
];
```

加入 `providers`：

```typescript
providers: [
  ...BASIC_SERVICES,
  UofxUserSetPluginHelper,
  UofxUserSetPluginService
],
```

### 3. 修改 `inspect-field.write.component.ts`

新增 import：

```typescript
import { Settings } from '@uofx/core';
import { UofxUserSetItemType, UofxUserSetPluginHelper } from '@uofx/web-components/user-select';
```

新增屬性：

```typescript
/** 登入者公司id */
corpId = Settings.UserInfo.corpId;
/** 選人元件可選類別 */
types: Array<UofxUserSetItemType> = [UofxUserSetItemType.DeptEmployee];
```

注入 `UofxUserSetPluginHelper`：

```typescript
constructor(
  private fb: FormBuilder,
  private tools: UofxFormTools,
  private fieldLogic: UofxFormFieldLogic,
  private dialogCtrl: UofxDialogController,
  private northWindServ: NorthWindService,
  private userSetHelper: UofxUserSetPluginHelper) {
  super();
}
```

新增表單控制項：

```typescript
this.form = this.fb.group({
  // ...existing
  inspDate: [null],
  inspector: [null],
})
```

更新 `setFormValue()`：

```typescript
setFormValue() {
  if (this.value) {
    // ...existing setValue
    this.form.controls.inspDate.setValue(this.value.inspDate);
    this.form.controls.inspector.setValue(this.value.inspector);
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
```

### 4. 修改 `inspect-field.write.component.html`

新增檢驗日期與檢驗人員欄位：

```html
<tr>
  <th><span>檢驗日期</span></th>
  <td colspan="3">
    <uofx-date-picker formControlName="inspDate"></uofx-date-picker>
  </td>
</tr>
<tr>
  <th><span>檢驗人員</span></th>
  <td colspan="3">
    <uofx-user-select formControlName="inspector" [corpId]="corpId" [types]="types"></uofx-user-select>
  </td>
</tr>
```
