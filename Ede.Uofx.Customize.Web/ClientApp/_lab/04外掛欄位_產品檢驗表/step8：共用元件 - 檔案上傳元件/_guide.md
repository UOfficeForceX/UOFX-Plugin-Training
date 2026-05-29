# 步驟 8：共用元件 - 檔案上傳元件

## 實作

### 1. 修改 `inspect-field.model.ts`

新增 import 及欄位定義：

```typescript
import { UofxFileGroupModel } from '@uofx/web-components/file';

export interface InspectFieldFillModel {
  // ...existing
  /** 檢驗報告 */
  inspReport: UofxFileGroupModel;
}
```

### 2. 修改 `inspect-field.module.ts`

新增 import：

```typescript
import { UofxFileModule, UofxFilePluginService } from "@uofx/web-components/file";
```

加入 `UOF_MODULES`：

```typescript
const UOF_MODULES = [
  // ...existing
  UofxFileModule
];
```

加入 `providers`：

```typescript
providers: [
  ...BASIC_SERVICES,
  UofxUserSetPluginHelper,
  UofxUserSetPluginService,
  UofxFilePluginService
],
```

### 3. 修改 `inspect-field.write.component.ts`

新增 import：

```typescript
import { Settings, UofxConsole } from '@uofx/core';
import { environment as env } from '@env/environment';
import { UofxFilePluginService } from '@uofx/web-components/file';
```

新增屬性：

```typescript
/** 取得 pluginCode */
pluginCode = env.manifest.code;
```

注入 `UofxFilePluginService`：

```typescript
constructor(
  // ...existing
  private filePluginServ: UofxFilePluginService) {
  super();
}
```

新增表單控制項：

```typescript
this.form = this.fb.group({
  // ...existing
  inspReport: [null]
})
```

更新 `setFormValue()` 加入 `inspReport`：

```typescript
this.form.controls.inspReport.setValue(this.value.inspReport);
```

更新 `checkBeforeSubmit()` 加入提交檔案邏輯：

```typescript
checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
  return new Promise(resolve => {
    this.valueChanges.emit(this.form.getRawValue());
    // 提交檔案
    if (this.form.controls.inspReport.value) {
      this.filePluginServ.submitFile(this.form.controls.inspReport.value).subscribe({
        next: res => {
          UofxConsole.log("已提交");
        }
      })
    }
    // ...existing
  });
}
```

> 說明：
> - `UofxFilePluginService.submitFile()`：提交檔案至伺服器
> - `pluginCode`：從 `environment.manifest.code` 取得外掛代號，供 `uofx-file-upload` 元件使用
> - 檔案需呼叫 `submitFile` 才會正式上傳

### 4. 修改 `inspect-field.write.component.html`

新增檢驗報告欄位：

```html
<tr>
  <th>
    <span>檢驗報告</span>
  </th>
  <td colspan="3">
    <uofx-file-upload formControlName="inspReport" [module]="'Plugin'" [pluginCode]="pluginCode"></uofx-file-upload>
  </td>
</tr>
```
