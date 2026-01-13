import { CommonModule } from '@angular/common';
import { DemoDialog } from './demo.dialog';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { UofxFileHelperModule } from '@uofx/app-components/file-helper';
import { UofxFileUploadModule } from '@uofx/app-components/file';
import { UofxIconModule } from '@uofx/app-components/icon';
import { UofxModalModule } from '@uofx/app-components/modal';
import { UofxPdfViewerModule } from '@uofx/app-components/pdf';
import { UofxToastController } from '@uofx/app-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    UofxModalModule,
    UofxIconModule,
    UofxPdfViewerModule,
    UofxFileHelperModule,
    UofxFileUploadModule,
  ],
  exports: [DemoDialog],
  declarations: [DemoDialog],
  providers: [UofxToastController]
})
export class ProductDialogModule { }
