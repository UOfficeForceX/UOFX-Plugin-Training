import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UofxFormFieldBaseModule, UofxFormModule } from '@uofx/web-components/form';
import { InspectFieldCompleteWriteComponent } from './write/inspect-field-complete.write.component';
import { InspectFieldCompletePropsComponent } from './props/inspect-field-complete.props.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { ProductListCompleteComponent } from './write/_dialog/product-list-complete/product-list-complete.component';
import { TableModule } from 'primeng/table';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { NorthWindService } from '@service/northwind.service';
import { UofxDatePickerModule } from '@uofx/web-components/date-picker';
import { UofxUserSelectModule, UofxUserSetPluginHelper, UofxUserSetPluginService } from "@uofx/web-components/user-select";
import { UofxToastModule } from '@uofx/web-components/toast';
import { UofxFileModule, UofxFilePluginService } from "@uofx/web-components/file";

@NgModule({
  declarations: [
    InspectFieldCompleteWriteComponent,
    InspectFieldCompletePropsComponent,
    ProductListCompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UofxFormFieldBaseModule,
    UofxFormModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    UofxButtonModule,
    UofxDialogModule,
    TableModule,
    UofxDatePickerModule,
    UofxUserSelectModule,
    UofxToastModule,
    UofxFileModule
  ],
  providers: [
    { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
    BasicHttpClient,
    NorthWindService,
    UofxUserSetPluginHelper,
    UofxUserSetPluginService,
    UofxFilePluginService
  ]
})
export class InspectFieldCompleteModule {
  static comp = {
    props: InspectFieldCompletePropsComponent,
    design: InspectFieldCompleteWriteComponent,
    write: InspectFieldCompleteWriteComponent,
    view: InspectFieldCompleteWriteComponent,
    print: InspectFieldCompleteWriteComponent
  }
}
