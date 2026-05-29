# 步驟 2：相同樣式表格佈局與基礎元件應用

## 實作

### 1. 修改 `inspect-field.module.ts`

新增 import：

```typescript
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
```

將模組加入 `UOF_MODULES`：

```typescript
const UOF_MODULES = [
  UofxFormFieldBaseModule,
  InputTextModule,
  InputNumberModule,
  DropdownModule
];
```

### 2. 修改 `inspect-field.write.component.scss`

新增表格樣式：

```scss
$border: 0.55px solid #cfd2d9;

:host {
  ::ng-deep {
    .fw-control {
      table {
        border-top: $border;
        border-left: $border;
        border-spacing: 0;

        td,
        th {
          padding: 4px 12px !important;
          font-size: 1.5rem;
          border-top: none;
          border-left: none;
          border-bottom: $border;
          border-right: $border;
        }

        th {
          background-color: #e8edf5;
          color: #002e90;
          text-align: right;
        }
      }
    }
  }
}

.gap {
  gap: 8px;
}
```

### 3. 修改 `inspect-field.write.component.html`

新增表格佈局，包含文字、數值及下拉選單元件：

```html
<div>
  <uofx-form-field-name [name]="name" [required]="required">
  </uofx-form-field-name>
</div>
<div class="fw-control">
  <table>
    <tr>
      <th><span>Title1</span></th>
      <td>
        <span>Content1</span>
      </td>
      <th><span>Title2</span></th>
      <td>
        <span>Content2</span>
      </td>
    </tr>
    <tr>
      <th><span>Title3</span></th>
      <td colspan="3">
        <span>Content3</span>
      </td>
    </tr>
    <tr>
      <th><span>文字元件</span></th>
      <td colspan="3">
        <input pInputText/>
      </td>
    </tr>
    <tr>
      <th><span>數值元件</span></th>
      <td colspan="3">
        <p-inputNumber></p-inputNumber>
      </td>
    </tr>
    <tr>
      <th><span>下拉選單元件</span></th>
      <td colspan="3">
        <p-dropdown [options]="options" optionLabel="name" optionValue="code"
        styleClass="width-100" filter="true" filterBy="name"></p-dropdown>
      </td>
    </tr>
  </table>
</div>
```

### 4. 修改 `inspect-field.write.component.ts`

新增下拉選單選項資料：

```typescript
options = [
  { name: '選項一', code: 'option1' },
  { name: '選項二', code: 'option2' },
  { name: '選項三', code: 'option3' }
];
```


