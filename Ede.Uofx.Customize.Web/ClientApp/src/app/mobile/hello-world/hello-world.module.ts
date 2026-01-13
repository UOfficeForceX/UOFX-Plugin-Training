import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UofxFileUploadModule } from '@uofx/app-components/file';
import { UofxFormFieldBaseModule } from '@uofx/app-components/form';
import { UofxPluginApiService } from '@uofx/plugin/api';

import { HelloWorldComponent } from './hello-world.field.component';

const UOF_MODULES = [
  UofxFormFieldBaseModule,
  UofxFileUploadModule,
];

const COMPONENTS = [
  HelloWorldComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    IonicModule.forRoot(),
    ...UOF_MODULES,
  ],
  providers: [UofxPluginApiService],
  exports: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [...COMPONENTS]
})

export class FieldHelloWorldAppModule {
  static comp = {
    write: HelloWorldComponent,
    view: HelloWorldComponent
  }
}
