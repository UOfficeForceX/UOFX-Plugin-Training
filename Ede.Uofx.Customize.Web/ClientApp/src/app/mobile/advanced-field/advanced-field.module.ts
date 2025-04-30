import { BASIC_HTTP_HANDLER, MyHttpHandler } from "@service/basic/basic-http-handler";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UofxErrorBlockModule, UofxErrorTipModule, UofxFormFieldBaseModule } from "@uofx/app-components/form";

import { AdvancedFieldComponent } from "./advanced-field.component";
import { BasicHttpClient } from "@service/basic/basic-http-client";
import { CommonModule } from "@angular/common";
import { EmployeeService } from "@service/employee.service";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { UofxAvatarModule } from "@uofx/web-components/avatar";
import { UofxDatePickerModule } from "@uofx/web-components/date-picker";
import { UofxModalModule } from "@uofx/app-components/modal";
import { UofxPluginApiService } from "@uofx/plugin/api";
import { UofxTranslateModule } from "@uofx/web-components";
import { UofxUserSelectModule } from "@uofx/web-components/user-select";

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
    { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
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
