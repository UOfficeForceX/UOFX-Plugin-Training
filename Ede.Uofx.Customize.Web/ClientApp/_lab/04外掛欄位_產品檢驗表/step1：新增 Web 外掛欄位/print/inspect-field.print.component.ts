import { Component, Input } from '@angular/core';
import { BpmFwPrintComponent } from '@uofx/web-components/form';
import { InspectFieldPropModel, InspectFieldFillModel } from '@model/inspect-field.model';

/**
 * InspectField 欄位列印元件
 *
 * 用於表單列印時呈現欄位資料
 */
@Component({
  selector: 'uofx-inspect-field-print',
  templateUrl: './inspect-field.print.component.html',
  styleUrls: ['./inspect-field.print.component.scss']
})
export class InspectFieldPrintComponent extends BpmFwPrintComponent {
  @Input() exProps: InspectFieldPropModel;
  value: InspectFieldFillModel;
}
