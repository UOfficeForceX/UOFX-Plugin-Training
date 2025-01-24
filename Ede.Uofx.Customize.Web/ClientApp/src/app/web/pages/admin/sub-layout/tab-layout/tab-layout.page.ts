import { MenuItem } from 'primeng/api';

import { Component, Inject, OnInit } from '@angular/core';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';

@UofxPluginAuthorize({ functionId: 'SUBLAYOUT' })
@Component({
  selector: 'plugin-web-admin-tab-layout',
  templateUrl: './tab-layout.page.html',
  styleUrls: ['./tab-layout.page.scss']
})
export class PluginWebAdminTabLayoutPage extends UofxPluginPage implements OnInit {
  /** 麵包屑清單 */
  breadCrumbItems: Array<MenuItem> = [
    { label: '大廳', routerLink: [this.baseUrl.admin] },
    { label: '有TAB的頁面' },
  ];
  /** 列表清單 */
  dataList = [
    { name: '出差單', version: '9', user: 'John', time: '2024/10/01 12:57' },
    { name: '請假單', version: '10', user: 'Sun', time: '2024/10/15 13:12' },
  ];

  constructor() { super(); }

  ngOnInit() { }
}
