import { UofxFormFieldBaseModule, UofxFormModule } from '@uofx/web-components/form';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplatePropsComponent } from './props/your-field-name.props.component';
import { TemplateWriteComponent } from './write/your-field-name.write.component';
import { NgModule } from '@angular/core';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { NorthWindService } from '@service/northwind.service';
import { UofxPluginApiService } from '@uofx/plugin/api';
import { EmployeeService } from '@service/employee.service';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';

const UOF_MODULES = [
  UofxFormFieldBaseModule,
  UofxButtonModule,
  UofxDialogModule,
  UofxFormModule,
];

const COMPONENTS = [
  TemplatePropsComponent,
  TemplateWriteComponent
];

const PRIME_MODULES = [
  TableModule,
  InputNumberModule
];

const DIALOG = [];

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
    ...UOF_MODULES,
    ...PRIME_MODULES
  ],
  providers: [
    UofxPluginApiService,
    NorthWindService,
    ...EMP_SERVICES
  ],
  exports: [...COMPONENTS, ...DIALOG],
  declarations: [...COMPONENTS]
})

export class TemplateModule {
  static comp = {
    props: TemplatePropsComponent,
    design: TemplateWriteComponent,
    write: TemplateWriteComponent,
    view: TemplateWriteComponent,
    print: TemplateWriteComponent,
  }
}
