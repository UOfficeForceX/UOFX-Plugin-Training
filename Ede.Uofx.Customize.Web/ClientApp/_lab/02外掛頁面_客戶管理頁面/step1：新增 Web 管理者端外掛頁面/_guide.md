# 步驟 1：新增 Web 管理者端外掛頁面

## 操作

1. 終端機進入專案 `ClientApp` 資料夾
2. 執行以下指令，使用 CLI 工具產生外掛頁面：

```
uofx dev c g --type admin-page --name customer-management --display-name 客戶管理 --layout container --func-id CUSTOMER
```

## 參數說明

| 參數 | 說明 |
|------|------|
| `c` | component（元件） |
| `g` | generate（產生） |
| `--type` | 元件類型（admin-page = 管理者端外掛頁面） |
| `--name` | 元件名稱 |
| `--display-name` | UI 顯示名稱 |
| `--layout` | 頁面佈局類型 |
| `--func-id` | 授權功能 ID |
