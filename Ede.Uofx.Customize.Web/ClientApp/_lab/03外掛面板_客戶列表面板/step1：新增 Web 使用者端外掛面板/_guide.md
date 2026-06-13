# 步驟 1：新增 Web 使用者端外掛面板

## 操作

1. 終端機進入專案 `ClientApp` 資料夾
2. 執行以下指令，使用 CLI 工具產生外掛面板：

```
uofx dev c g --type user-panel --name customer-list --code customerList --display-name 客戶列表
```

## 參數說明

| 參數 | 說明 |
|------|------|
| `c` | component（元件） |
| `g` | generate（產生） |
| `--type` | 元件類型（user-panel = 使用者端外掛面板） |
| `--name` | 元件名稱 |
| `--code` | 面板代碼（對應 panels-design.json 中的 code） |
| `--display-name` | UI 顯示名稱 |
