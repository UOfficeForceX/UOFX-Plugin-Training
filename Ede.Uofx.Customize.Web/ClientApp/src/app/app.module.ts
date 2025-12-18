import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AdvancedFieldModule } from './web/advanced-field/advanced-field.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CheckPluginComponent } from '@uofx/plugin';
import { FieldAdvancedAppModule } from './mobile/advanced-field/advanced-field.module';
import { FormsModule } from '@angular/forms';
import { HelloWorldModule } from './web/hello-world/hello-world.module';
import { Helper } from '@uofx/core';
import { IconModule } from './icon.module';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { UofxPackageModule } from './uofx-pack.module';
import { UofxTranslateLoader } from './translate-loader';

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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CheckPluginComponent, pathMatch: 'full' },
    ]),
    ...I18NSERVICE_MODULES,
    IconModule.forRoot(),
    UofxPackageModule,
    AdvancedFieldModule,
    HelloWorldModule,
    FieldAdvancedAppModule,
  ],
  providers: [
    { provide: 'BASE_HREF', useFactory: Helper.getBaseHref },
    MessageService,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
