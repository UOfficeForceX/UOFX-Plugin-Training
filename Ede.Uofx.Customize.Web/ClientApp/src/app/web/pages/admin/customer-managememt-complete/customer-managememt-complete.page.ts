import { Component, OnInit } from '@angular/core';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';

import { MenuItem } from 'primeng/api';
import { NorthWindService } from '@service/northwind.service';
import { UofxConsole } from '@uofx/core';

@UofxPluginAuthorize({ functionId: 'CUSTOMERCOMPLETE' })
@Component({
  selector: 'plugin-web-admin-customer-managememt-complete',
  templateUrl: './customer-managememt-complete.page.html',
  styleUrls: ['./customer-managememt-complete.page.scss']
})
export class PluginWebAdminCustomerManagementCompletePage extends UofxPluginPage implements OnInit {
  /** 麵包屑清單 */
  breadCrumbItems: Array<MenuItem> = [
    { label: '大廳', routerLink: [this.baseUrl.admin] },
    { label: '客戶管理' },
  ];
  /** 列表清單 */
  dataList = [];

  constructor(private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit() {
    /** 設定伺服器位址 */
    this.northWindServ.serverUrl = this.pluginSetting.entryHost;
    this.getCustomers();
  }

  /**
   * 取得客戶列表
   * @param page
   * @param limit
   */
  getCustomers() {
    this.northWindServ.getCustomers().subscribe({
      next: res => {
        UofxConsole.log('客戶列表', res);
        this.dataList = res;
      }
    });
  }
}
