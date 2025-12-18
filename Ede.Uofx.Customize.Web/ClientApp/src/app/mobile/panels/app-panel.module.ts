import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { UofxCorePipeModule, UofxTranslateModule } from '@uofx/app-components';
import { UofxEmptyStatusModule } from '@uofx/app-components/empty';
import { UofxModalModule } from '@uofx/app-components/modal';
import { UofxSkeletonModule } from '@uofx/app-components/skeleton';

import { AppDefaultPanelComponent } from './default/default.component';
import { AppTestPanelComponent } from './test/test.component';

const PACKAGES = [
  UofxCorePipeModule,
  UofxEmptyStatusModule,
  UofxModalModule,
  UofxSkeletonModule,
  UofxTranslateModule,
];
const PANELS = [AppDefaultPanelComponent, AppTestPanelComponent];
const CONTROLLERS = [ModalController];

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    ...PACKAGES,
  ],
  declarations: [...PANELS],
  providers: [...CONTROLLERS],
})
export class AppPanelModule {
  /**
   * 面板清單，變數名稱與元件名稱一對一
   *
   * ❌此處請勿使用
   * ***static panels = { ...PANELS }***
   */
  static panels = { AppDefaultPanelComponent, AppTestPanelComponent }
}
