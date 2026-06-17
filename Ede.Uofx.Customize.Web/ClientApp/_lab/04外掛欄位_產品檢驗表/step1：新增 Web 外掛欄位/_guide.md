# 步驟 1：新增 Web 外掛欄位

## 操作

1. 終端機進入專案 `ClientApp` 資料夾
2. 執行以下指令，使用 CLI 工具產生外掛欄位：

```
uofx dev c g --type field --name inspect-field --code inspectField --display-name 產品檢驗表
```

## 參數說明

| 參數 | 說明 |
|------|------|
| `c` | component（元件） |
| `g` | generate（產生） |
| `--type` | 元件類型（field = 外掛欄位） |
| `--name` | 元件名稱 |
| `--code` | 欄位代碼 |
| `--display-name` | UI 顯示名稱 |

## 調整 `inspect-field.module.ts`

將 `static comp` 中的 `design`、`view`、`print` 皆暫時指向 `InspectFieldWriteComponent`：

```typescript
static comp = {
  props: InspectFieldPropsComponent,
  design: InspectFieldWriteComponent,
  write: InspectFieldWriteComponent,
  view: InspectFieldWriteComponent,
  print: InspectFieldWriteComponent,
}
```

> 說明：初期開發時可先專注於 `write` 元件開發，再分別實作 `design`、`view`、`print` 元件。
