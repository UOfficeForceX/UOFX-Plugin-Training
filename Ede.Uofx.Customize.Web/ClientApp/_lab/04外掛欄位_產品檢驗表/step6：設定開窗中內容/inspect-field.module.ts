import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UofxFormFieldBaseModule, UofxFormModule } from '@uofx/web-components/form';

import { InspectFieldPropsComponent } from './props/inspect-field.props.component';
import { InspectFieldWriteComponent } from './write/inspect-field.write.component';
import { InspectFieldDesignComponent } from './design/inspect-field.design.component';
import { InspectFieldViewComponent } from './view/inspect-field.view.component';
import { InspectFieldPrintComponent } from './print/inspect-field.print.component';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { TableModule } from 'primeng/table';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { NorthWindService } from '@service/northwind.service';
import { UofxPluginApiService } from '@uofx/plugin/api';

import { ProductListComponent } from './write/_dialog/product-list/product-list.component';

const UOF_MODULES = [
  UofxFormFieldBaseModule,
  UofxFormModule,
  InputTextModule,
  InputNumberModule,
  DropdownModule,
  UofxButtonModule,
  UofxDialogModule,
  TableModule
];

const COMPONENTS = [
  InspectFieldPropsComponent,
  InspectFieldWriteComponent,
  InspectFieldDesignComponent,
  InspectFieldViewComponent,
  InspectFieldPrintComponent
];

const BASIC_SERVICES = [
  { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
  BasicHttpClient,
  NorthWindService,
  UofxPluginApiService
];

/**
 * InspectField 欄位模組
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ...UOF_MODULES
  ],
  providers: [
    ...BASIC_SERVICES
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS, ProductListComponent]
})
export class InspectFieldModule {
  static comp = {
    props: InspectFieldPropsComponent,
    design: InspectFieldWriteComponent,
    write: InspectFieldWriteComponent,
    view: InspectFieldWriteComponent,
    print: InspectFieldWriteComponent,
  }
}
