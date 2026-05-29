# 步驟 5：共用元件 - 按鈕、開窗元件

## 操作

1. 在 `src/app/web/inspect-field/write/` 下新增 `_dialog` 資料夾
2. 進入 `_dialog` 資料夾，執行：

```
ng g c product-list
```

## 實作

### 1. 修改 `inspect-field.model.ts`

新增 `inspProduct` 欄位：

```typescript
/** 填寫 model */
export interface InspectFieldFillModel {
  /** 評語 */
  comment: string;
  /** 檢驗數量 */
  inspQuantity: number;
  /** 檢驗結果 */
  inspResult: string;
  /** 產品 */
  inspProduct: string;
}
```

### 2. 修改 `inspect-field.module.ts`

新增 import：

```typescript
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { ProductListComponent } from './write/_dialog/product-list/product-list.component';
```

加入 `UOF_MODULES`：

```typescript
const UOF_MODULES = [
  UofxFormFieldBaseModule,
  UofxFormModule,
  InputTextModule,
  InputNumberModule,
  DropdownModule,
  UofxButtonModule,
  UofxDialogModule
];
```

在 `declarations` 加入 `ProductListComponent`（Auto Import 套件會自動加入）：

```typescript
declarations: [...COMPONENTS, ProductListComponent]
```

### 3. 修改 `inspect-field.write.component.ts`

新增 import：

```typescript
import { UofxDialogController, UofxDialogOptions } from '@uofx/web-components/dialog';
import { ProductListComponent } from './_dialog/product-list/product-list.component';
```

注入 `UofxDialogController`：

```typescript
constructor(
  private fb: FormBuilder,
  private tools: UofxFormTools,
  private fieldLogic: UofxFormFieldLogic,
  private dialogCtrl: UofxDialogController) {
  super();
}
```

在 `initForm()` 中新增 `inspProduct` 控制項，並於 `setFormValue()` 中回填：

```typescript
this.form = this.fb.group({
  comment: [null, [Validators.required, UofxValidators.notAllowedSpaceString]],
  inspQuantity: [null, [Validators.required, Validators.min(1)]],
  inspResult: [null],
  inspProduct: [null]
})

setFormValue() {
  if (this.value) {
    this.form.controls.comment.setValue(this.value.comment);
    this.form.controls.inspQuantity.setValue(this.value.inspQuantity);
    this.form.controls.inspResult.setValue(this.value.inspResult);
    this.form.controls.inspProduct.setValue(this.value.inspProduct);
  }
}
```

新增 `showDialog()` 開啟產品視窗：

```typescript
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
```

新增 `clearProduct()` 用於清除產品：

```typescript
clearProduct() {
  this.form.controls.inspProduct.setValue(null);
}
```

### 4. 修改 `inspect-field.write.component.html`

前端 UI 新增「檢驗產品」：

```html
<tr>
  <th>
    <span>檢驗產品</span>
  </th>
  <td colspan="3">
    <div class="d-flex gap">
      <input class="flex-1" pInputText formControlName="inspProduct" readonly>
      <uofx-button [mode]="'u-btn-primary'" (click)="showDialog()">選擇產品</uofx-button>
      <uofx-button [mode]="'u-btn-cancel'" (click)="clearProduct()">清除</uofx-button>
    </div>
    <uofx-form-error-tip [control]="form.controls.inspProduct"></uofx-form-error-tip>
  </td>
</tr>
```

### 5. 修改 `product-list.component.ts`

繼承 `UofxDialog` 類別：

```typescript
import { Component } from '@angular/core';
import { UofxDialog } from '@uofx/web-components/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent extends UofxDialog {

}
```

### 6. 修改 `product-list.component.html`

貼上 Dialog 模板結構：

```html
<p-dialog #pDialog [(visible)]="visible">
  <ng-template pTemplate="header">
    <uofx-dialog-header [title]="'產品列表'"></uofx-dialog-header>
  </ng-template>
  <ng-template pTemplate="content">
    <uofx-dialog-body>
    </uofx-dialog-body>
  </ng-template>
  <ng-template pTemplate="footer">
    <uofx-dialog-footer>
    </uofx-dialog-footer>
  </ng-template>
</p-dialog>
```

### 7. 修改 `product-list.component.scss`

設定 dialog 內容高度：

```scss
:host ::ng-deep {
  .p-dialog-content {
    height: 600px;
  }
}
```
