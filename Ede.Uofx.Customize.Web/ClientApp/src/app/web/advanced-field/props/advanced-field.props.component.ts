import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { AdvancedFieldExProps } from '@model/advanced.model';
import { BpmFwPropsComponent } from '@uofx/web-components/form';
import { createNumberValidatorValidator } from './numberValidator';

@Component({
  selector: 'uofx-advance-field-props-component',
  templateUrl: './advanced-field.props.component.html'
})
export class AdvancedFieldPropsComponent extends BpmFwPropsComponent implements OnInit {

  @Input() exProps: AdvancedFieldExProps;

  constructor(
    public fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    super(fb);
  }

  ngOnInit(): void {
    console.log('欄位屬性:', this.exProps);

    this.initPluginSettings({
      toBeSubjects: [{ name: '帳號', jsonPath: 'account' }],
      toBeConditions: [{ name: '申請次數', jsonPath: 'count', type: 'Numeric' }],
      toBeCalculates: [{ name: '申請次數', jsonPath: 'count' }],
      toBeNodes: [{ name: '職務代理人', jsonPath: 'agent' }],
      searchContentJsonPath: 'account',
    });

    this.initForm();
    this.initExProps();

    this.cdr.detectChanges();
  }

  /** 初始化form */
  initForm() {
    this.addFormControl('isShowEmpNo', false, [Validators.required]);
    this.addFormControl('isCheckDate', false);
    this.addFormControl('checkDays', null, [Validators.required, createNumberValidatorValidator()]);

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
        isShowEmpNo: true,
        isCheckDate: true,
        checkDays: 10
      };
    }

    this.form.setValue(this.exProps);
  }
}
