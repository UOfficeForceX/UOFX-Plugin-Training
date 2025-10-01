import { UofxPluginAuthorize, UofxPluginPage, } from '@uofx/plugin';

import { Component } from '@angular/core';
import { LobbyDemoDialog } from '../dialog/demo.dialog';
import { ModalController } from '@ionic/angular';
import { UofxConsole } from '@uofx/core';

@UofxPluginAuthorize({ functionId: 'LOBBY' })
@Component({
  selector: 'uofx-mobile-lobby',
  templateUrl: './lobby.page.html',
})
export class LobbyPage extends UofxPluginPage {
  /** tab 預設選取 */
  selectedTab = 0;
  /** 列表資料 */
  list = [
    {
      name: '公司年會通知',
      dept: '人資部',
      time: new Date('2024-10-15T09:00:00')
    },
    {
      name: '季度報告發布',
      dept: '財務部',
      time: new Date('2024-10-20T14:30:00')
    },
    {
      name: '系統維護公告',
      dept: '資訊部',
      time: new Date('2024-10-22T23:00:00')
    },
    {
      name: '極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限極限',
      dept: '資訊部',
      time: new Date('2024-10-24T08:00:00')
    }
  ]

  constructor(private modalCtrl: ModalController) { super(); }

  ionViewDidEnter(): void {
    UofxConsole.log('=== LobbyPage ===');  
    UofxConsole.log('pluginSetting', this.pluginSetting);
    UofxConsole.log('baseUrl', this.baseUrl.appPlugin);
  }

  /** 切換 tab事件 */
  onSegmentChange(ev: CustomEvent) {
    this.selectedTab = ev.detail.value;
  }

  /** 點選列 */
  async onClick(item) {
    const modal = await this.modalCtrl.create({
      component: LobbyDemoDialog,
      componentProps: {
        name: item.name,
      },
    });
    modal.onDidDismiss().then(() => {
      UofxConsole.log('LobbyPage onClick', item);
    });
    await modal.present();
  }
}
