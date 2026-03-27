import { Component, Inject, OnInit } from '@angular/core';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';

import { MenuItem } from 'primeng/api';
import { UofxConsole } from '@uofx/core';

@UofxPluginAuthorize({ functionId: 'USERFULL' })
@Component({
  selector: 'plugin-web-user-full-layout',
  templateUrl: './full-layout.page.html',
  styleUrls: ['./full-layout.page.scss']
})

export class PluginWebUserFullLayoutPage extends UofxPluginPage implements OnInit {
  /** 麵包屑清單 */
  breadCrumbItems: Array<MenuItem> = [
    { label: '大廳', routerLink: [this.baseUrl.user] },
    { label: '滿版的頁面' },
  ];
  /** 列表清單 */
  dataList = [
    { type: '行政', items: [{ name: '出差單', icon: 'mi-flight-takeoff', color: '#634FA2' }, { name: '請假單', icon: 'mi-assessment', color: '' }] },
    { type: '營銷', items: [{ name: '報價單', icon: 'mi-paid', color: '#F19E39' }, { name: '合約', icon: 'mi-inventory', color: '#5985E1' }] }
  ];

  constructor() { super(); }

  ngOnInit() {
    UofxConsole.log('PluginWebUserFullLayoutPage ngOnInit',this.baseUrl.toString())
  }
}
