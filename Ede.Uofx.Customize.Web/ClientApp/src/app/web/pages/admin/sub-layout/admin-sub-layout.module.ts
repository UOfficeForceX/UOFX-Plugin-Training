import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { PluginWebAdminSiderLayoutPage } from './sider-layout/sider-layout.page';
import { PluginWebAdminTabLayoutPage } from './tab-layout/tab-layout.page';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { UofxBreadcrumbModule } from '@uofx/web-components/breadcrumb';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxIconModule } from '@uofx/web-components/icon';
import { UofxSearchBarModule } from '@uofx/web-components/search-bar';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'sub', pathMatch: 'full' },
      { path: 'sub', component: PluginWebAdminTabLayoutPage },
      { path: 'sider', component: PluginWebAdminSiderLayoutPage },
    ]),
    UofxBreadcrumbModule,
    UofxButtonModule,
    UofxIconModule,
    UofxSearchBarModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    TableModule,
    TabViewModule
  ],
  exports: [],
  declarations: [
    PluginWebAdminTabLayoutPage,
    PluginWebAdminSiderLayoutPage,
  ]
})
export class PluginWebAdminSubLayoutModule { }
