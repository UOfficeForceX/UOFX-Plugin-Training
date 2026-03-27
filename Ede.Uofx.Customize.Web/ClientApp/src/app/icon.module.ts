import { NgModule, ModuleWithProviders } from '@angular/core';
import { UofxIconBaseModule, UofxIconBaseService } from '@uofx/icon';

@NgModule({
  imports: [UofxIconBaseModule],
  providers: [UofxIconBaseService],
})
export class IconModule {
  static forRoot(): ModuleWithProviders<IconModule> {
    const iconService = new UofxIconBaseService('assets/icons/');
    return {
      ngModule: IconModule,
      providers: [
        { provide: UofxIconBaseService, useValue: iconService }
      ]
    };
  }
}
