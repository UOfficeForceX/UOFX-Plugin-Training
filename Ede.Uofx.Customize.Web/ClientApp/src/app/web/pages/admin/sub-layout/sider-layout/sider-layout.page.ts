import { Component, OnInit } from '@angular/core';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';

import { MenuItem } from 'primeng/api';
import { UofxConsole } from '@uofx/core';

@UofxPluginAuthorize({ functionId: 'SUBLAYOUT_SIDER' })
@Component({
  selector: 'plugin-web-admin-sider-layout',
  templateUrl: './sider-layout.page.html',
})
export class PluginWebAdminSiderLayoutPage extends UofxPluginPage implements OnInit {
  /** 麵包屑清單 */
  breadCrumbItems: Array<MenuItem> = [
    { label: '大廳', routerLink: [this.baseUrl.admin] },
    { label: '有側邊欄的頁面' },
  ];
  /** 列表清單 */
  dataList = [
    { name: '出差單', version: '9', user: 'John', time: '2024/10/01 12:57' },
    { name: '請假單', version: '10', user: 'Sun', time: '2024/10/15 13:12' },
  ];
  /** 左側已選項目 */
  selected: any;
  /** 左側清單 */
  items = [
    { label: '行政' },
    { label: '營銷' }
  ];

  ngOnInit() {
    this.selected = this.items[0];
    UofxConsole.log('=== PluginWebAdminSiderLayoutPage ===');
    UofxConsole.log('pluginSetting', this.pluginSetting);
    UofxConsole.log('baseUrl', this.baseUrl.adminPlugin);
  }

  /** 點選左側列表 */
  onMenuClick(item: { text: string }) {
    this.selected = item;
  }
}
