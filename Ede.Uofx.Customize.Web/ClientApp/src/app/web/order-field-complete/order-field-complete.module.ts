import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { UofxFormFieldBaseModule } from '@uofx/web-components/form';
import { NorthWindService } from '@service/northwind.service';
import { EmployeeService } from '@service/employee.service';
import { UofxPluginApiService } from '@uofx/plugin/api';
// components
import { OrderFieldCompleteWriteComponent } from './write/order-field-complete.write.component';
import { OrderFieldCompletePropsComponent } from './props/order-field-complete.props.component';
import { ProductListCompleteComponent } from './write/_dialog/product-list-complete/product-list-complete.component';
// modules
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { UofxFormModule } from '@uofx/web-components/form';

const COMPONENTS = [
  OrderFieldCompleteWriteComponent,
  OrderFieldCompletePropsComponent
]

const DIALOG = [
  ProductListCompleteComponent
]

const UOF_MODULES = [
  UofxFormFieldBaseModule,
  UofxButtonModule,
  UofxDialogModule,
  UofxFormModule
]

const PRIMENG_MODULES = [
  TableModule,
  InputNumberModule
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
    ...UOF_MODULES,
    ...PRIMENG_MODULES,
  ],
  providers: [
    UofxPluginApiService,
    NorthWindService,
    ...EMP_SERVICES,
  ],
  declarations: [
    ...COMPONENTS,
    ...DIALOG,
  ],
  exports: [
    ...COMPONENTS,
    ...DIALOG
  ],
})
export class OrderFieldCompleteModule {
  static comp = {
    props: OrderFieldCompletePropsComponent,
    design: OrderFieldCompleteWriteComponent,
    write: OrderFieldCompleteWriteComponent,
    view: OrderFieldCompleteWriteComponent,
    print: OrderFieldCompleteWriteComponent,
  }
}
