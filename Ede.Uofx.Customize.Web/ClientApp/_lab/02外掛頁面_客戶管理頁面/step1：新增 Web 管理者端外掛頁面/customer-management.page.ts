import { Component, OnInit } from '@angular/core';
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

  constructor() {
    super();
  }

  ngOnInit(): void {
    // 模擬資料
    for (let i = 0; i < 10; i++) {
      this.dataList.push({
        name: `項目_${i}`,
        version: i.toString(),
        user: `使用者${i}`,
        time: new Date().toLocaleString()
      });
    }
  }
}
