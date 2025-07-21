import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UofxFileModule, UofxFilePluginService } from '@uofx/web-components/file';
import { UofxFormFieldBaseModule, UofxFormModule } from '@uofx/web-components/form';
import { UofxUserSelectModule, UofxUserSetPluginHelper, UofxUserSetPluginService } from '@uofx/web-components/user-select';

import { AdvancedFieldDesignComponent } from './design/advanced-field.design.component';
import { AdvancedFieldPropsComponent } from './props/advanced-field.props.component';
import { AdvancedFieldWriteComponent } from './write/advanced-field.write.component';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '@service/employee.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { NorthWindService } from '@service/northwind.service';
import { RouterModule } from '@angular/router';
import { SdkService } from '@service/sdk.service';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDatePickerModule } from '@uofx/web-components/date-picker';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { UofxIconModule } from '@uofx/web-components/icon';
import { UofxPipeModule } from '@uofx/web-components/pipes';
import { UofxPluginApiService } from '@uofx/plugin/api';
import { UofxToastModule } from '@uofx/web-components/toast';
import { UofxTranslateModule } from '@uofx/web-components';

const PRIMENG_MODULES = [
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  InputTextModule,
  InputNumberModule,
  TableModule
];

const UOF_MODULES = [
  UofxDialogModule,
  UofxFormFieldBaseModule,
  UofxFormModule,
  UofxIconModule,
  UofxToastModule,
  UofxTranslateModule,
  UofxUserSelectModule,
  UofxButtonModule,
  UofxDatePickerModule,
  UofxPipeModule,
  UofxFileModule
];

const COMPONENTS = [
  AdvancedFieldDesignComponent,
  AdvancedFieldPropsComponent,
  AdvancedFieldWriteComponent
];

const EMP_SERVICES = [
  { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
  BasicHttpClient,
  EmployeeService
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'design', pathMatch: 'full' },
      { path: 'design', component: AdvancedFieldDesignComponent },
      { path: 'props', component: AdvancedFieldPropsComponent },
      { path: 'write', component: AdvancedFieldWriteComponent },
      { path: 'view', component: AdvancedFieldWriteComponent },
    ]),
    TranslateModule.forChild(),
    ...PRIMENG_MODULES,
    ...UOF_MODULES
  ],
  providers: [
    UofxPluginApiService,
    NorthWindService,
    SdkService,
    UofxFilePluginService,
    UofxUserSetPluginHelper,
    UofxUserSetPluginService,
    ...EMP_SERVICES
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})

export class AdvancedFieldModule {
  static comp = {
    props: AdvancedFieldPropsComponent,
    design: AdvancedFieldDesignComponent,
    write: AdvancedFieldWriteComponent,
    view: AdvancedFieldWriteComponent,
    print: AdvancedFieldWriteComponent,
  }
}
