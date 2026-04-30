import { Component, Input } from '@angular/core';

import { AdvancedFieldExProps } from '@model/advanced.model';
import { BpmFwDesignComponent } from '@uofx/web-components/form';
import { Settings } from '@uofx/core';

@Component({
  selector: 'uofx-advanced-field-design',
  templateUrl: './advanced-field.design.component.html',
  styleUrls: ['./advanced-field.design.component.scss']
})

export class AdvancedFieldDesignComponent extends BpmFwDesignComponent {

  /** 屬性資料 */
  @Input() exProps: AdvancedFieldExProps;

  /** 登入者公司id */
  corpId = Settings.UserInfo.corpId;
}
