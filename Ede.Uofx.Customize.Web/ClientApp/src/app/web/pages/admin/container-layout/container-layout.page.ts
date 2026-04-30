import { MenuItem } from 'primeng/api';

import { Component, Inject, OnInit } from '@angular/core';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';

@UofxPluginAuthorize({ functionId: 'CONTAINER' })
@Component({
  selector: 'plugin-web-admin-container-layout',
  templateUrl: './container-layout.page.html',
  styleUrls: ['./container-layout.page.scss']
})
export class PluginWebAdminContainerLayoutPage extends UofxPluginPage implements OnInit {
  /** 麵包屑清單 */
  breadCrumbItems: Array<MenuItem> = [
    { label: '大廳', routerLink: [this.baseUrl.admin] },
    { label: '內容置中' },
  ];
  /** 列表清單 */
  dataList = [];

  ngOnInit() {
    for (let i = 0; i < 30; i++) {
      this.dataList.push({ name: `data_${i.toString()}`, version: i.toString(), user: `user${i.toString()}`, time: new Date().toLocaleString() });
    }
  }
}
