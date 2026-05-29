# 步驟 3：新增「看全部」導頁按鈕

## 實作

### 1. 修改 `customer-list.component.ts`

新增 `targetLink` 屬性儲存導頁連結：

```typescript
targetLink: string;
```

初始化設定導頁連結，指向管理者端的客戶管理頁面：

```typescript
ngOnInit(): void {
  // 程式碼進入點
  this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
  this.getCustomers();
  this.targetLink = `${this.baseUrl.adminPlugin}/customer-management`;
}
```

> 說明：`BaseUrl` 是由 `UofxPluginPanel` 基底類別提供的屬性。

`BaseUrl` 屬性說明：

| 屬性 | 說明 |
|------|------|
| `admin` | 管理者大廳 |
| `adminPlugin` | 管理者目前執行的 Plugin 根路徑 |
| `user` | 使用者大廳 |
| `userPlugin` | 使用者目前執行的 Plugin 根路徑 |
| `appPlugin` | App 目前執行的 Plugin 根路徑 |

### 2. 修改 `customer-list.component.html`

新增「看全部」按鈕，點擊後導向管理者端客戶管理頁面：

```html
<div class="uofx-layout-header">
  <div class="u-panel-header">
    <span class="u-panel-title">客戶列表</span>
  </div>
  <div class="u-panel-action">
    <uofx-button [mode]="'u-btn-primary'" [outlined]="true" [smallSize]="true" [routerLink]="targetLink">
      看全部
    </uofx-button>
  </div>
</div>
```

> 說明：使用 `routerLink` 進行導頁。
