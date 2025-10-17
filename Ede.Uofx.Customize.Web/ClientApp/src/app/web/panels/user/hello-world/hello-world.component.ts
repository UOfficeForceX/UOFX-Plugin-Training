import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { Component, OnInit } from '@angular/core';
import { UofxDialogController, UofxDialogModule } from '@uofx/web-components/dialog';
import { UofxEmptyStatusModule, UofxLoadingModule } from '@uofx/web-components';
import { UofxToastController, UofxToastModule } from '@uofx/web-components/toast';
import { delay, of } from 'rxjs';

import { BasicHttpClient } from '@service/basic/basic-http-client';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { EmployeeService } from '@service/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { PanelViewDialog } from './view/view.dialog';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxConsole } from '@uofx/core';
import { UofxIconModule } from '@uofx/web-components/icon';
import { UofxPipeModule } from '@uofx/web-components/pipes';
import { UofxPluginApiService } from '@uofx/plugin/api';
import { UofxPluginPanel } from '@uofx/plugin';

@Component({
  standalone: true,
  selector: 'web-panel-hello-world',
  templateUrl: './hello-world.component.html',
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    DataViewModule,
    TooltipModule,

    UofxButtonModule,
    UofxDialogModule,
    UofxEmptyStatusModule,
    UofxIconModule,
    UofxLoadingModule,
    UofxPipeModule,
    UofxToastModule,
  ],
  providers: [
    { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
    BasicHttpClient,
    UofxPluginApiService,
    EmployeeService
  ],
})
export class HelloWorldPanelComponent extends UofxPluginPanel implements OnInit {
  products: Array<{
    name: string;
    createTime: Date;
  }> = [];
  /** 是否載入中 */
  isLoading = false;

  get targetLink(): String {
    return `${this.baseUrl.userPlugin}/tab`;
  }

  constructor(
    private pluginService: UofxPluginApiService,
    private employeeService: EmployeeService,
    private dialogCtrl: UofxDialogController,
    private toastCtrl: UofxToastController,) {
    super();
  }

  ngOnInit() {
    UofxConsole.log('=== HelloWorldPanelComponent ===');
    UofxConsole.log('pluginSetting', this.pluginSetting);

    // this.pluginService.getUserInfo(Settings.UserInfo.id).subscribe({
    //   next: (res) => {
    //     UofxConsole.log('getUserInfo res', res);
    //   },
    //   error: (err) => {
    //     console.error('getUserInfo err', err);
    //   }
    // })

    this.employeeService.serverUrl = this.pluginSetting.entryHost;
    this.employeeService.getValidEmpNumber().subscribe({
      next: (res) => {
        UofxConsole.log('getValidEmpNumber res', res);
      },
      error: (err) => {
        console.error('getValidEmpNumber err', err);
      }
    });

    this.loadList();
  }

  /** 取得資料 */
  loadList(): void {
    this.isLoading = true;

    of(null).pipe(
      delay(3000)
    ).subscribe({
      next: () => {
        this.products = [
          { name: 'title1', createTime: new Date('2021-01-01 12:00:00') },
          { name: 'title2', createTime: new Date('2021-01-01 12:00:00') },
          { name: 'title3', createTime: new Date('2021-01-01 12:00:00') },
        ];
      },
      complete: () => {
        this.isLoading = false;
        this.toastCtrl.successToast('外掛面板載入完成!');
      }
    });
  }

  /** 開窗 */
  onItemClick(item): void {
    this.dialogCtrl.create({
      component: PanelViewDialog,
      size: 'xsmall',
      params: { name: item.name }
    });
  }
}
