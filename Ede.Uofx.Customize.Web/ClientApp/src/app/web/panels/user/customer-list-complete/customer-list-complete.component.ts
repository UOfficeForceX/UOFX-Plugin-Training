import { Component } from '@angular/core';
import { UofxPluginPanel } from '@uofx/plugin';
import { UofxButtonModule } from '@uofx/web-components/button';
import { NorthWindService } from '@service/northwind.service';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { CustomerModel } from '@model/northwind.model';
import { map } from 'rxjs';
import { DataViewModule } from 'primeng/dataview';
import { RouterModule } from '@angular/router';
import { UofxConsole } from '@uofx/core';

@Component({
  selector: 'app-customer-list-complete',
  standalone: true,
  imports: [UofxButtonModule, DataViewModule, RouterModule],
  providers: [
    { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
    NorthWindService,
    BasicHttpClient,
  ],
  templateUrl: './customer-list-complete.component.html',
  styleUrl: './customer-list-complete.component.scss'
})
export class CustomerListCompleteComponent extends UofxPluginPanel{
  /** 客戶列表 */
  customerList: CustomerModel[] = [];
  /** 導頁連結 */
  targetLink: string;

  constructor(private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit() {
    /** 設定伺服器位址 */
    this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
    this.getCustomers();
    /** 設定導頁連結 */
    this.targetLink = `${this.baseUrl.adminPlugin}/customer-complete`
  }

  /** 取得客戶列表 */
  getCustomers() {
    this.northWindServ.getCustomers().pipe(
      map(res => res.slice(0, 3))
    ).subscribe({
      next: res => {
        UofxConsole.log('客戶列表', res);
        this.customerList = res;
      }
    })
  }
}
