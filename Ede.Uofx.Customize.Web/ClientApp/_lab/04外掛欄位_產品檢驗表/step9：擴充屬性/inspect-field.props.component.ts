import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BpmFwPropsComponent } from '@uofx/web-components/form';
import { InspectFieldPropModel } from '@model/inspect-field.model';

/**
 * InspectField 欄位屬性設定元件
 *
 * 用於表單設計時設定欄位的屬性
 */
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
    }
    else {
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
