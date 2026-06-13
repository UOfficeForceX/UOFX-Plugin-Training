# 步驟 2：串接 API 取得客戶列表

## 實作

### 1. 修改 `customer-management.page.ts`

新增 import：

```typescript
import { NorthWindService } from '@service/northwind.service';
import { UofxConsole } from '@uofx/core';
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
  /** 設定伺服器位址 */
  this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
  this.getCustomers();
}

/** 取得客戶列表 */
getCustomers() {
  this.northWindServ.getCustomers().subscribe({
    next: res => {
      UofxConsole.log('customers', res);
      this.dataList = res;
    }
  });
}
```

### 2. 修改 `customer-management.page.html`

將表格欄位替換為客戶資料欄位：

```html
<ng-template pTemplate="header">
  <tr>
    <th width="10%">客戶 ID</th>
    <th width="30%">公司名稱</th>
    <th width="30%">聯絡人</th>
    <th width="30%">聯絡電話</th>
  </tr>
</ng-template>
<ng-template pTemplate="body" let-item>
  <tr>
    <td>{{ item.customerID }}</td>
    <td>{{ item.companyName }}</td>
    <td>{{ item.contactName }}</td>
    <td>{{ item.phone }}</td>
  </tr>
</ng-template>
```
