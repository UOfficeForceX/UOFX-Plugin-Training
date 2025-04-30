import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { UofxModalModule } from '@uofx/app-components/modal';

import { LobbyDemoDialog } from './dialog/demo.dialog';
import { LobbyPage } from './lobby/lobby.page';

const PACKAGES = [UofxModalModule];
const COMPONENTS = [LobbyPage, LobbyDemoDialog];
const CONTROLLERS = [ModalController];

@NgModule({
  imports: [
    ...PACKAGES,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    BrowserModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'lobby', pathMatch: 'full' },
      { path: 'lobby', component: LobbyPage },
    ])
  ],
  exports: [...PACKAGES, ...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [
    ...CONTROLLERS,
  ],
})
export class PageModule { }
