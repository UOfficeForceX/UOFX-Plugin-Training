# 步驟 9：擴充屬性

## 實作

### 1. 修改 `inspect-field.model.ts`

為 `InspectFieldPropModel` 加入屬性定義：

```typescript
/** 屬性 model */
export interface InspectFieldPropModel {
  /** 檢驗數量預設值 */
  defaultQuantity: number;
}
```

### 2. 修改 `inspect-field.props.component.ts`

實作擴充屬性設定元件：

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BpmFwPropsComponent } from '@uofx/web-components/form';
import { InspectFieldPropModel } from '@model/inspect-field.model';

@Component({
  selector: 'uofx-inspect-field-props',
  templateUrl: './inspect-field.props.component.html',
  styleUrls: ['./inspect-field.props.component.scss']
})
export class InspectFieldPropsComponent extends BpmFwPropsComponent implements OnInit {
  @Input() exProps: InspectFieldPropModel;

  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    /** 設定擴充屬性 */
    this.pluginUtils.initPluginSettings({
      toBeSubjects: [{ name: '檢驗日期', jsonPath: 'inspDate' }],
      toBeConditions: [{ name: '檢驗數量', jsonPath: 'inspQuantity', type: 'Numeric' }],
      toBeNodes: [{ name: '檢驗人員', jsonPath: 'inspector' }],
      searchContentJsonPath: 'inspProduct',
      toBeExports: [{ name: '評語', jsonPath: 'comment' }]
    })

    this.initForm();
    this.initExProps();
  }

  /** 初始化表單 */
  initForm() {
    this.fieldUtils.addFormControl('defaultQuantity', null, [Validators.required]);
    this.setControlStatus();
  }

  /** 設定控制項狀態 */
  setControlStatus() {
    if (this.editable) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  /** 初始化屬性 */
  initExProps() {
    if (!this.exProps) {
      this.exProps = {
        defaultQuantity: 10
      };
    }
    this.form.setValue(this.exProps);
  }
}
```

> 說明：
> - `fieldUtils.addFormControl()`：動態新增表單控制項
> - `initExProps()`：若無既有屬性值，提供預設值

### 3. 修改 `inspect-field.props.component.html`

```html
<form [formGroup]="form">
  <section class="padding-horizontal-2x">
    <div class="margin-vertical-2x d-flex align-items-center">
      <div>
        <span>檢驗數量預設值</span>
      </div>
      <div class="margin-left">
        <p-inputNumber formControlName="defaultQuantity"></p-inputNumber>
      </div>
    </div>
  </section>
</form>
```

### 4. 修改 `inspect-field.write.component.ts`

加入 `OnChanges` 以接收屬性變更，並用 `exProps.defaultQuantity` 作為 `inspQuantity` 預設值：

```typescript
export class InspectFieldWriteComponent extends BpmFwWriteComponent implements OnInit, OnChanges {
```

新增 `ngOnChanges()`：

```typescript
ngOnChanges() {
  /**
   * 屬性變更時，更新檢驗數量預設值
   * 僅於表單已初始化時更新
   */
  if (this.form) {
    this.form.controls['inspQuantity'].setValue(this.exProps.defaultQuantity);
  }
}
```

更新 `initForm()` 中 `inspQuantity` 預設值：

```typescript
inspQuantity: [this.exProps?.defaultQuantity ?? null, [Validators.required, Validators.min(1)]],
```
