import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UofxBreadcrumbModule } from '@uofx/web-components/breadcrumb';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxIconModule } from '@uofx/web-components/icon';

import { PluginWebUserFullLayoutPage } from './full-layout/full-layout.page';
import { PluginWebUserTabLayoutPage } from './tab-layout/tab-layout.page';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'full', pathMatch: 'full' },
      { path: 'full', component: PluginWebUserFullLayoutPage },
      { path: 'tab', component: PluginWebUserTabLayoutPage },
    ]),
    UofxBreadcrumbModule,
    UofxButtonModule,
    UofxIconModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TableModule,
    InputTextModule,
    DropdownModule,
    TabViewModule
  ],
  exports: [],
  declarations: [
    PluginWebUserTabLayoutPage,
    PluginWebUserFullLayoutPage,
  ],
})
export class UserModule { }
