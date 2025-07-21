import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UofxBreadcrumbModule } from '@uofx/web-components/breadcrumb';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxIconModule } from '@uofx/web-components/icon';
import { UofxSearchBarModule } from '@uofx/web-components/search-bar';

import { PluginWebAdminContainerLayoutPage } from './container-layout/container-layout.page';
import { PluginWebAdminCustomerManagementCompletePage } from './customer-managememt-complete/customer-managememt-complete.page';
import { NorthWindService } from '@service/northwind.service';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { EmployeeService } from '@service/employee.service';
import { UofxPluginApiService } from '@uofx/plugin/api';

@NgModule({
  imports: [
    // admin/plugin/edesampleplugin/container
    // admin/plugin/edesampleplugin/sub
    // admin/plugin/edesampleplugin/sub/sider
    RouterModule.forChild([
      { path: '', redirectTo: 'container', pathMatch: 'full' },
      { path: 'container', component: PluginWebAdminContainerLayoutPage },
      { path: 'customer-complete', component: PluginWebAdminCustomerManagementCompletePage },
      {
        path: 'sub',
        loadChildren: () => import('./sub-layout/admin-sub-layout.module').then(m => m.PluginWebAdminSubLayoutModule),
      }
    ]),
    UofxBreadcrumbModule,
    UofxButtonModule,
    UofxSearchBarModule,
    UofxIconModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MenuModule,
    TableModule,
  ],
  exports: [],
  declarations: [
    PluginWebAdminContainerLayoutPage,
    PluginWebAdminCustomerManagementCompletePage
  ],providers: [
    { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
    NorthWindService,
    BasicHttpClient,
    EmployeeService,
    UofxPluginApiService,
  ]
})
export class AdminModule { }
