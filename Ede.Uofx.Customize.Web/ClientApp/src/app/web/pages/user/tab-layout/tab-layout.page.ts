import { Component, OnInit } from '@angular/core';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';

import { MenuItem } from 'primeng/api';
import { TabViewChangeEvent } from 'primeng/tabview';
import { UofxConsole } from '@uofx/core';

@UofxPluginAuthorize({ functionId: 'USERTAB' })
@Component({
  selector: 'plugin-web-user-tab-layout',
  templateUrl: './tab-layout.page.html',
  styleUrls: ['./tab-layout.page.scss']
})
export class PluginWebUserTabLayoutPage extends UofxPluginPage implements OnInit {
  /** 麵包屑清單 */
  breadCrumbItems: Array<MenuItem> = [
    { label: '大廳', routerLink: [this.baseUrl.user] },
    { label: '有TAB的頁面' },
  ];
  /** 列表清單 */
  dataList = [
    { name: '出差單', version: '9', user: 'John', time: '2024/10/01 12:57' },
    { name: '請假單', version: '10', user: 'Sun', time: '2024/10/15 13:12' },
  ];
  tabIndex = 0;
  types = [
    { name: '行政', code: 'type1' },
    { name: '營銷', code: 'type2' }
  ];
  tabs = ['已發佈', '草稿'];

  ngOnInit() {
    UofxConsole.log('=== PluginWebUserTabLayoutPage ===');
    UofxConsole.log('pluginSetting', this.pluginSetting);
    UofxConsole.log('baseUrl', this.baseUrl.userPlugin);
  }

  /** 切換頁籤 */
  onTabSelectedIndex(tab: TabViewChangeEvent) {
    this.tabIndex = tab.index;
    UofxConsole.log('PluginWebUserTabLayoutPage onTabSelectedIndex',tab.index.toString());
  }
}
