import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InspectFieldExProps } from '@model/inspect-field.model';
import { BpmFwPropsComponent } from '@uofx/web-components/form';

@Component({
  selector: 'app-inspect-field-complete.props',
  templateUrl: './inspect-field-complete.props.component.html',
  styleUrl: './inspect-field-complete.props.component.scss'
})
export class InspectFieldCompletePropsComponent extends BpmFwPropsComponent implements OnInit {

  /** 屬性資料 */
  @Input() exProps: InspectFieldExProps;

  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    /** 設定擴充屬性 */
    this.pluginUtils.initPluginSettings({
      toBeSubjects: [{ name: '檢驗日期', jsonPath: 'inspDate' }],
      toBeConditions: [{ name: '檢驗數量', jsonPath: 'inspQuantity', type: 'Numeric' }],
      toBeCalculates: [{ name: '檢驗數量', jsonPath: 'inspQuantity' }],
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
