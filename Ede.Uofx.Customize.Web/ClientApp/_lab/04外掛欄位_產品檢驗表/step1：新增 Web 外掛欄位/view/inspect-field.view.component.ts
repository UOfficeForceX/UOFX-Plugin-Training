import { Component, Input } from '@angular/core';
import { BpmFwViewComponent } from '@uofx/web-components/form';
import { InspectFieldPropModel, InspectFieldFillModel } from '@model/inspect-field.model';

/**
 * InspectField 欄位檢視元件
 *
 * 用於表單簽核/檢視時顯示欄位資料（唯讀）
 */
@Component({
  selector: 'uofx-inspect-field-view',
  templateUrl: './inspect-field.view.component.html',
  styleUrls: ['./inspect-field.view.component.scss']
})
export class InspectFieldViewComponent extends BpmFwViewComponent {
  @Input() exProps: InspectFieldPropModel;
  value: InspectFieldFillModel;
}
