import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AdminModule } from './web/pages/admin/admin.module';
import { AdvancedFieldModule } from './web/advanced-field/advanced-field.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FieldAdvancedAppModule } from './mobile/advanced-field/advanced-field.module';
import { FormsModule } from '@angular/forms';
import { HelloWorldModule } from './web/hello-world/hello-world.module';
import { Helper } from '@uofx/core';
import { HomeComponent } from './develop-lab/home/home.component';
import { IconModule } from './icon.module';
import { LayoutComponent } from './develop-lab/layout/layout.component';
import { MessageService } from 'primeng/api';
import { NavMenuComponent } from './develop-lab/nav-menu/nav-menu.component';
import { OrderFieldCompleteModule } from './web/order-field-complete/order-field-complete.module';
import { PageModule } from './mobile/pages/page.module';
import { RouterModule } from '@angular/router';
import { TemplateModule } from './web/template/your-field-name.module';
import { UofxTranslateLoader } from './translate-loader';
import { UserModule } from './web/pages/user/user.module';

// #region i18n services
export function I18nHttpLoaderFactory(http: HttpClient) {
  return new UofxTranslateLoader(http);
}

const I18NSERVICE_MODULES = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: I18nHttpLoaderFactory,
      deps: [HttpClient],
    },
    defaultLanguage: 'zh-TW',
    useDefaultLang: true,
  }),
];

//#endregion

const manifest = require("/src/plugin.manifest.json");

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavMenuComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'hello-world',
        loadChildren: () => import('./web/hello-world/hello-world.module').then(m => m.HelloWorldModule)
      },
      {
        path: 'advanced-field',
        loadChildren: () => import('./web/advanced-field/advanced-field.module').then(m => m.AdvancedFieldModule)
      }
    ]),
    ...I18NSERVICE_MODULES,
    IconModule.forRoot(),
    AdvancedFieldModule,
    HelloWorldModule,
    OrderFieldCompleteModule,
    TemplateModule,
    FieldAdvancedAppModule,
    AdminModule,
    UserModule,
    PageModule,
  ],
  providers: [
    { provide: 'BASE_HREF', useFactory: Helper.getBaseHref },
    { provide: 'PLUGIN_MANIFEST', useValue: { code: manifest.code } },
    MessageService,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
