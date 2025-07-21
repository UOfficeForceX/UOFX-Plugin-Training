import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';

import { UofxConsole } from '@uofx/core';

@Component({
  selector: 'uofx-mobile-lobby-demo-dialog',
  templateUrl: './demo.dialog.html',
})
export class LobbyDemoDialog implements OnInit, ViewDidEnter {
  /** 名稱 */
  @Input() name: string;

  constructor(private modalCtrl: ModalController) { }

  ionViewDidEnter(): void {
    UofxConsole.log('LobbyDemoDialog ionViewDidEnter name:', this.name);
  }

  ngOnInit() {
    UofxConsole.log('LobbyDemoDialog ngOnInit name:', this.name);
  }

  /** 關閉事件  */
  onDismissClick() {
    this.modalCtrl.dismiss();
  }
}
