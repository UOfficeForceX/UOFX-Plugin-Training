import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelloWorldComponent } from './hello-world.field.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UofxFormFieldBaseModule } from '@uofx/app-components/form';
import { UofxPluginApiService } from '@uofx/plugin/api';

const UOF_MODULES = [
  UofxFormFieldBaseModule,
];

const COMPONENTS = [
  HelloWorldComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: HelloWorldComponent, pathMatch: 'full' }
    ]),
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
