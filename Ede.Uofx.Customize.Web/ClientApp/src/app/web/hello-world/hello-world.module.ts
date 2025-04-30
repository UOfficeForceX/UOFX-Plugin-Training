import { UofxFormFieldBaseModule } from '@uofx/web-components/form';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelloWorldPropsComponent } from './props/hello-world.props.component';
import { HelloWorldWriteComponent } from './write/hello-world.write.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const UOF_MODULES = [
  UofxFormFieldBaseModule,
];

const COMPONENTS = [
  HelloWorldPropsComponent,
  HelloWorldWriteComponent
];

const BASIC_SERVICES = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'design', pathMatch: 'full' },
      { path: 'props', component: HelloWorldPropsComponent },
      { path: 'write', component: HelloWorldWriteComponent },
      {
        path: 'app',
        loadChildren: () => import('../../mobile/hello-world/hello-world.module').then(m => m.FieldHelloWorldAppModule)
      }
    ]),
    TranslateModule.forChild(),
    ...UOF_MODULES
  ],
  providers: [
    ...BASIC_SERVICES
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})

export class HelloWorldModule {
  static comp = {
    props: HelloWorldPropsComponent,
    design: HelloWorldWriteComponent,
    write: HelloWorldWriteComponent,
    view: HelloWorldWriteComponent,
    print: HelloWorldWriteComponent,
  }
}
