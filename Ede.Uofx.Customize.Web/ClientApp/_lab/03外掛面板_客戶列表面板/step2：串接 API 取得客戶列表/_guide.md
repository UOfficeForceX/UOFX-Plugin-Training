# 步驟 2：串接 API 取得客戶列表

## 實作

### 1. 修改 `customer-list.component.ts`

新增 import：

```typescript
import { CustomerModel } from '@model/northwind.model';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { NorthWindService } from '@service/northwind.service';
import { UofxConsole } from '@uofx/core';
import { map } from 'rxjs/internal/operators/map';
import { DataViewModule } from 'primeng/dataview';
```

調整 `@Component` 中 providers，註冊 NorthWindService 及其相依的 BasicHttpClient、BASIC_HTTP_HANDLER，讓元件可以呼叫後端 API：

```typescript
providers: [
  { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
  NorthWindService,
  BasicHttpClient,
  UofxPluginApiService
],
```

新增 `customerList` 屬性儲存客戶列表資料：

```typescript
customerList: CustomerModel[] = [];
```

修改 constructor，注入 NorthWindService：

```typescript
constructor(private northWindServ: NorthWindService) {
  super();
}
```

初始化設定伺服器位址並呼叫取得客戶列表的方法：

```typescript
ngOnInit(): void {
  // 設定伺服器位址
  this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
  this.getCustomers();
}

/** 取得客戶列表 */
getCustomers() {
  this.northWindServ.getCustomers().pipe(
    map(res => res.slice(0, 3))
  ).subscribe({
    next: res => {
      UofxConsole.log('客戶列表', res);
      this.customerList = res;
    }
  })
}
```

> 說明：使用 `map` 運算子取前 3 筆資料，因面板空間有限，僅顯示部分資料。

### 2. 修改 `customer-list.component.html`

使用 PrimeNG `p-dataView` 元件顯示客戶列表：

```html
<div class="u-panel-user uofx-layout">
  <div class="uofx-layout-header">
    <div class="u-panel-header">
      <span class="u-panel-title">客戶列表</span>
    </div>
  </div>
  <div class="uofx-layout-content u-panel-content">
    <p-dataView [value]="customerList">
      <ng-template pTemplate="list" let-items>
        @for( item of items; track $index){
        <div class="u-panel-list-item">
          <div class="text-15 font-weight-600 margin-bottom-s">
            {{ item.companyName }}
          </div>
          <div>{{ item.phone }}</div>
        </div>
        }
      </ng-template>
    </p-dataView>
  </div>
</div>
```
