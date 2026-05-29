import { Component, Input, OnInit } from '@angular/core';
import { BpmFwWriteComponent } from '@uofx/web-components/form';
import { InspectFieldPropModel, InspectFieldFillModel } from '@model/inspect-field.model';

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

  constructor() {
    super();
  }

  ngOnInit(): void {
    // 程式碼進入點
  }

  /** 表單送出前檢查（必須實作） */
  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    return new Promise(resolve => {
      // TODO: 實作驗證邏輯
      resolve(true);
    });
  }
}
