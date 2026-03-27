import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { ChartData, ChartOptions } from 'chart.js';
import { Component, OnInit } from '@angular/core';

import { BasicHttpClient } from '@service/basic/basic-http-client';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '@service/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { UofxConsole } from '@uofx/core';
import { UofxPluginApiService } from '@uofx/plugin/api';
import { UofxPluginPanel } from '@uofx/plugin';

@Component({
  standalone: true,
  selector: 'web-panel-hello-world',
  templateUrl: './hello-world.component.html',
  imports: [
    CommonModule,
    HttpClientModule,

    ChartModule,
  ],
  providers: [
    UofxPluginApiService,
    { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
    BasicHttpClient,
    EmployeeService
  ]
})
export class HelloWorldPanelComponent extends UofxPluginPanel implements OnInit {
  /** 設定圖表的插件，ChartOptions的datalabels設定需要有這個才有效果 */
  plugins = [ChartDataLabels];
  /** 圓餅圖資料標籤 */
  pieDataLabels = ['同意 50%', '不同意 30%', '沒意見 20%'];
  /** 圓餅圖資料值 */
  pieDatas = [50, 30, 20];
  /** 圓餅圖資料背景顏色 */
  pieBGColor = ['#5599FF', '#FFAA33', '#D0D0D0'];
  /** 有限制容量的顯示資料物件 (for 圓餅圖) */
  pieDataSet: ChartData<'pie'> = {
    labels: this.pieDataLabels,
    datasets: [
      {
        data: this.pieDatas,
        backgroundColor: this.pieBGColor,
      },
    ],
  };

  /** 設定圓餅圖的選項 */
  pieOptions: ChartOptions<'pie'> = {
    // 避免hover時，圓餅圖樣式會變化
    events: null,
    layout: {
      padding: 30,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: 'black',
        anchor: 'end',
        align: 'end',
        font: { size: 15 },
        formatter: (value, context) => context.chart.data.labels[context.dataIndex],
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  constructor(
    private pluginService: UofxPluginApiService,
    private employeeService: EmployeeService) {
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
  }
}
