import { Component, Input, OnInit } from '@angular/core';
import { BpmFwWriteComponent, UofxValidators } from '@uofx/web-components/form';
import { InspectFieldPropModel, InspectFieldFillModel } from '@model/inspect-field.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * InspectField 欄位填寫元件
 *
 * 用於表單填寫時的輸入介面
 */
@Component({
  selector: 'uofx-inspect-field-write',
  templateUrl: './inspect-field.write.component.html',
  styleUrls: ['./inspect-field.write.component.scss']
})
export class InspectFieldWriteComponent extends BpmFwWriteComponent implements OnInit {
  @Input() exProps: InspectFieldPropModel;
  /** 填寫 model */
  value: InspectFieldFillModel;
  form: FormGroup;

  options = [
    { name: '通過', code: 'PASSED' },
    { name: '不通過', code: 'FAILED' },
    { name: '需複驗', code: 'RETEST' }
  ];

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    // 程式碼進入點
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      comment: [null, [Validators.required, UofxValidators.notAllowedSpaceString]],
      inspQuantity: [null, [Validators.required, Validators.min(1)]],
      inspResult: [null]
    })
  }

  /** 表單送出前檢查（必須實作） */
  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    return new Promise(resolve => {
      // TODO: 實作驗證邏輯
      resolve(true);
    });
  }
}
