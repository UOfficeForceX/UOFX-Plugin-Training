import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'uofx-mobile-lobby-demo-dialog',
  templateUrl: './demo.dialog.html',
})
export class LobbyDemoDialog implements OnInit, ViewDidEnter {
  /** 名稱 */
  @Input() name: string;

  constructor(private modalCtrl: ModalController) { }

  ionViewDidEnter(): void {
    console.log('ionViewDidEnter name:', this.name);
  }

  ngOnInit() {
    console.log('name:', this.name);
  }

  /** 關閉事件  */
  onDismissClick() {
    this.modalCtrl.dismiss();
  }
}
