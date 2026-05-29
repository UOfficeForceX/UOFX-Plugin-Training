import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  ngOnInit(): void {
    // 程式碼進入點
  }
}
