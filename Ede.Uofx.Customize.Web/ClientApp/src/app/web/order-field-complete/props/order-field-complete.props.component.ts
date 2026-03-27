import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BpmFwPropsComponent } from '@uofx/web-components/form';
// import { YourExProps } from './path/to/your.model';

@Component({
  selector: 'app-order-field-complete.props',
  templateUrl: './order-field-complete.props.component.html',
  styleUrl: './order-field-complete.props.component.css'
})

export class OrderFieldCompletePropsComponent extends BpmFwPropsComponent implements OnInit {

  // @Input() exProps: YourExProps;

  constructor(
    public fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    super(fb);
  }

  ngOnInit(): void {

    /** 設定欄位屬性 */
    // this.initPluginSettings({
    //   toBeSubjects: [{ name: '顯示名稱', jsonPath: '對應到欄位的資料結構' }],
    //   toBeConditions: [{ name: '顯示名稱', jsonPath: '對應到欄位的資料結構', type: 'Text' }],
    //   toBeCalculates: [{ name: '顯示名稱', jsonPath: '對應到欄位的資料結構' }],
    //   toBeNodes: [{ name: '顯示名稱', jsonPath: '對應到欄位的資料結構' }],
    //   toBeExports: [{ name: '顯示名稱', jsonPath: '對應到欄位的資料結構' }],
    //   searchContentJsonPath: '對應到欄位的資料結構',
    // });

    this.initForm();
    this.initExProps();

    this.cdr.detectChanges();
  }

  /** 初始化form */
  initForm() {
    // this.addFormControl('formControl', null, [Validators.required]);
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
        // formControl: 'default value',
      };
    }

    this.form.setValue(this.exProps);
  }
}
