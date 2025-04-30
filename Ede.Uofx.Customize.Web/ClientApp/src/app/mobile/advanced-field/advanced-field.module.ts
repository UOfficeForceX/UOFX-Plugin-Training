import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { BASIC_HTTP_HANDLER, EmployeeHttpHandler } from '@service/basic/basic-http-handler';
import { EmployeeService } from '@service/employee.service';
import { UofxTranslateModule } from '@uofx/app-components';
import { UofxAvatarModule } from '@uofx/app-components/avatar';
import { UofxDatePickerModule } from '@uofx/app-components/date-picker';
import {
  UofxErrorBlockModule,
  UofxErrorTipModule,
  UofxFormFieldBaseModule
} from '@uofx/app-components/form';
import { UofxModalModule } from '@uofx/app-components/modal';
import { UofxUserSelectModule } from '@uofx/app-components/user-select';
import { UofxPluginApiService } from '@uofx/plugin/api';

import { AdvancedFieldComponent } from './advanced-field.component';

const COMPONENTS = [AdvancedFieldComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: AdvancedFieldComponent, pathMatch: 'full' }
    ]),
    IonicModule.forRoot(),
    UofxAvatarModule,
    UofxDatePickerModule,
    UofxErrorBlockModule,
    UofxErrorTipModule,
    UofxFormFieldBaseModule,
    UofxModalModule,
    UofxTranslateModule,
    UofxUserSelectModule,
  ],
  providers: [
    UofxPluginApiService,
    { provide: BASIC_HTTP_HANDLER, useClass: EmployeeHttpHandler },
    BasicHttpClient,
    EmployeeService,
  ],
  exports: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [...COMPONENTS]
})
export class FieldAdvancedAppModule {
  static comp = {
    write: AdvancedFieldComponent,
    view: AdvancedFieldComponent
  }
}
