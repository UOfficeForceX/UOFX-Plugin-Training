import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UofxFormFieldBaseModule } from '@uofx/web-components/form';

import { InspectFieldPropsComponent } from './props/inspect-field.props.component';
import { InspectFieldWriteComponent } from './write/inspect-field.write.component';
import { InspectFieldDesignComponent } from './design/inspect-field.design.component';
import { InspectFieldViewComponent } from './view/inspect-field.view.component';
import { InspectFieldPrintComponent } from './print/inspect-field.print.component';

const UOF_MODULES = [
  UofxFormFieldBaseModule,
];

const COMPONENTS = [
  InspectFieldPropsComponent,
  InspectFieldWriteComponent,
  InspectFieldDesignComponent,
  InspectFieldViewComponent,
  InspectFieldPrintComponent
];

const BASIC_SERVICES = [];

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
  declarations: [...COMPONENTS]
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
