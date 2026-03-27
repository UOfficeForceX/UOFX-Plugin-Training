import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { UofxConsole } from '@uofx/core';

@Component({
  selector: 'uofx-mobile-demo-dialog',
  templateUrl: './demo.dialog.html',
})
export class DemoDialog implements OnInit, ViewDidEnter {
  /** 功能名稱 */
  @Input() name: string;
  /** 產品名稱 */
  // @Input() productName: string;

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
