import { Component, Input } from '@angular/core';
import { BpmFwDesignComponent } from '@uofx/web-components/form';
import { InspectFieldPropModel } from '@model/inspect-field.model';

/**
 * InspectField 欄位設計元件
 *
 * 用於表單設計器中顯示欄位的預覽
 */
@Component({
  selector: 'uofx-inspect-field-design',
  templateUrl: './inspect-field.design.component.html',
  styleUrls: ['./inspect-field.design.component.scss']
})
export class InspectFieldDesignComponent extends BpmFwDesignComponent {
  @Input() exProps: InspectFieldPropModel;
}
