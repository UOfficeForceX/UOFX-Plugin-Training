# 步驟 6：設定開窗中內容

## 實作

### 1. 修改 `inspect-field.module.ts`

新增 import：

```typescript
import { TableModule } from 'primeng/table';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { NorthWindService } from '@service/northwind.service';
import { UofxPluginApiService } from '@uofx/plugin/api';
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
  UofxDialogModule,
  TableModule
];
```

加入 `BASIC_SERVICES`：

```typescript
const BASIC_SERVICES = [
  { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
  BasicHttpClient,
  NorthWindService,
  UofxPluginApiService
];
```

### 2. 修改 `inspect-field.write.component.ts`

新增 import 與注入 `NorthWindService`：

```typescript
import { NorthWindService } from '@service/northwind.service';
```

```typescript
constructor(
  private fb: FormBuilder,
  private tools: UofxFormTools,
  private fieldLogic: UofxFormFieldLogic,
  private dialogCtrl: UofxDialogController,
  private northWindServ: NorthWindService) {
  super();
}
```

在 `ngOnInit` 設定伺服器位址：

```typescript
ngOnInit(): void {
  this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
  this.initForm();
  this.fieldUtils.syncParentFormStatusToInnerForm(this.form);
}
```

### 3. 修改 `product-list.component.ts`

實作完整的 Dialog 元件，注入 `NorthWindService` 取得產品列表：

```typescript
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '@model/northwind.model';
import { NorthWindService } from '@service/northwind.service';
import { UofxDialog } from '@uofx/web-components/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent extends UofxDialog implements OnInit {
  /** 商品列表 */
  products: ProductModel[] = [];
  /** 已選擇商品 */
  selectedProduct: string;

  constructor(private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit() {
    // 將傳入參數帶入已選擇商品變數
    if (this.params.data) this.selectedProduct = this.params.data
    // 初始化時取得商品列表
    this.getProducts();
  }

  /** 取得商品列表 */
  getProducts() {
    this.northWindServ.getProducts().subscribe({
      next: res => {
        this.products = res;
      }
    });
  }
}
```

> 說明：`this.params.data`：從 `showDialog()` 傳入的已選產品值

### 4. 修改 `product-list.component.html`

實作產品列表表格：

```html
<p-dialog #pDialog [(visible)]="visible">
  <ng-template pTemplate="header">
    <uofx-dialog-header [title]="'產品列表'"></uofx-dialog-header>
  </ng-template>
  <ng-template pTemplate="content">
    <uofx-dialog-body>
      <p-table #dt [value]="products" [paginator]="true" [rows]="10"
        [tableStyle]="{ 'min-width': '50rem' }"
        [(selection)]="selectedProduct" selectionMode="single"
        [globalFilterFields]="['productName', 'unitPrice', 'unitsInStock']">
        <ng-template pTemplate="caption">
          <input type="text" pInputText placeholder="搜尋商品" class="width-100"
            (input)="dt.filterGlobal($event.target.value, 'contains')" />
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th style="width: 4rem"></th>
            <th>商品名稱</th>
            <th>單價</th>
            <th>庫存</th>
          <tr>
        </ng-template>
        <ng-template pTemplate="body" let-item>
          <tr>
            <td><p-tableRadioButton [value]="item.productName" /></td>
            <td>{{ item.productName }}</td>
            <td>{{ item.unitPrice }}</td>
            <td>{{ item.unitsInStock }}</td>
          <tr>
        </ng-template>
      </p-table>
    </uofx-dialog-body>
  </ng-template>
  <ng-template pTemplate="footer">
    <uofx-dialog-footer>
      <uofx-button [mode]="'u-btn-cancel'" (click)="close()">取消</uofx-button>
      <uofx-button [mode]="'u-btn-primary'" (click)="close(selectedProduct)">確定</uofx-button>
    </uofx-dialog-footer>
  </ng-template>
</p-dialog>
```

> 說明：
> - `close()`：關閉 Dialog 不回傳值
> - `close(selectedProduct)`：關閉 Dialog 並回傳選取的產品
