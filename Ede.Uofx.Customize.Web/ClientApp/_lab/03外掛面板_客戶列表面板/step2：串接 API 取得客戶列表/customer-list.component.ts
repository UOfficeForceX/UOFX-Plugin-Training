import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UofxPluginPanel } from '@uofx/plugin';
import { UofxPluginApiService } from '@uofx/plugin/api';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { UofxToastModule } from '@uofx/web-components/toast';
import { UofxIconModule } from '@uofx/web-components/icon';
import { CustomerModel } from '@model/northwind.model';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { NorthWindService } from '@service/northwind.service';
import { UofxConsole } from '@uofx/core';
import { map } from 'rxjs/internal/operators/map';
import { DataViewModule } from 'primeng/dataview';

/**
 * CustomerList 使用者端面板元件
 *
 * 用於使用者端的功能面板
 */
@Component({
  standalone: true,
  selector: 'uofx-user-customer-list-panel',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    UofxButtonModule,
    UofxDialogModule,
    UofxIconModule,
    UofxToastModule,
    DataViewModule
  ],
  providers: [
    { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
    NorthWindService,
    BasicHttpClient,
    UofxPluginApiService
  ],
})
export class CustomerListPanelComponent extends UofxPluginPanel implements OnInit {

  customerList: CustomerModel[] = [];

  constructor(private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit(): void {
    // 程式碼進入點
    this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
    this.getCustomers();
  }

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
