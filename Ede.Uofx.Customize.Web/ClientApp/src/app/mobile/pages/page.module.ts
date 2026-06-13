import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LobbyPage } from './lobby/lobby.page';
import { NgModule } from '@angular/core';
import { ProductDialogModule } from '../dialog/dialog.module';
import { RouterModule } from '@angular/router';
import { UofxModalModule } from '@uofx/app-components/modal';

const PACKAGES = [
  UofxModalModule,
  ProductDialogModule
];
const COMPONENTS = [LobbyPage];

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule.forChild([
      { path: '', redirectTo: 'lobby', pathMatch: 'full' },
      { path: 'lobby', component: LobbyPage },
    ]),

    ...PACKAGES,
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class PageModule { }
