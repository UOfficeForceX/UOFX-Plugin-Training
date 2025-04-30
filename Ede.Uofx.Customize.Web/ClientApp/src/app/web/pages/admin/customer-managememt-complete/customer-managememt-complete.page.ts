import { Component, Inject, OnInit } from '@angular/core';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';

import { MenuItem } from 'primeng/api';
import { NorthWindService } from '@service/northwind.service';

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
    console.log('baseUrl', this.baseUrl);
    console.log('pluginSetting', this.pluginSetting);

    // 呼叫api之前要設定serverUrl為外掛欄位站台位址
    this.northWindServ.serverUrl = this.pluginSetting.entryHost;
    this.getCustomers(1, 10);
  }

  /**
   * 取得客戶列表
   * @param page
   * @param limit
   */
  getCustomers(page: number, limit: number) {
    this.northWindServ.getCustomers(page, limit).subscribe({
      next: res => {
        console.log(res);
        this.dataList = res;
      }
    });
  }
}
