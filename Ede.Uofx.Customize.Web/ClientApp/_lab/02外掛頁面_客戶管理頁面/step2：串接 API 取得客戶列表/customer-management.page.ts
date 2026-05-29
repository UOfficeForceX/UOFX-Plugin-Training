import { Component, OnInit } from '@angular/core';
import { NorthWindService } from '@service/northwind.service';
import { UofxConsole } from '@uofx/core';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';
import { MenuItem } from 'primeng/api';

/**
 * CustomerManagement 管理端頁面元件（置中容器佈局）
 */
@UofxPluginAuthorize({ functionId: 'CUSTOMER' })
@Component({
  selector: 'uofx-admin-customer-management-page',
  templateUrl: './customer-management.page.html',
  styleUrls: ['./customer-management.page.scss']
})
export class CustomerManagementPage extends UofxPluginPage implements OnInit {
  /** 麵包屑清單 */
  breadCrumbItems: Array<MenuItem> = [
    { label: '管理', routerLink: [this.baseUrl.admin] },
    { label: '客戶管理' },
  ];

  /** 列表清單 */
  dataList: any[] = [];

  constructor(private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit(): void {
    /** 設定伺服器位址 */
    this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
    this.getCustomers();
  }

  /** 取得客戶列表 */
  getCustomers() {
    this.northWindServ.getCustomers().subscribe({
      next: res => {
        UofxConsole.log('customers', res);
        this.dataList = res;
      }
    });
  }
}
