import { Component, Injector, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { UofxConsole } from '@uofx/core';
import { UofxPluginPanel } from '@uofx/plugin';

import { DemoDialog } from '../../dialog/demo.dialog';

@Component({
  selector: 'uofx-mobile-default-panel-demo',
  templateUrl: './default.component.html',
  providers: [ModalController],
})
export class AppDefaultPanelComponent extends UofxPluginPanel implements OnInit {
  private router = inject(Router);
  private toastCtrl = inject(ToastController);
  private modalCtrl = inject(ModalController);

  injector = inject(Injector);

  isLoading: boolean = false;
  productList: Array<Product> = [];

  ngOnInit(): void {
    console.log('pluginSetting', this.pluginSetting);
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.productList = [
        {
          id: '3',
          category: '日用品',
          name: 'UV防曬乳液SPF50+/PA++++/50ml',
          shelfTime: new Date('2025-07-31T08:00:00Z')
        },
        {
          id: '2',
          category: '香氛',
          name: '綜合精油清新系列.木質調/10ml',
          shelfTime: new Date('2025-07-25T10:23:00Z')
        },
        {
          id: '1',
          category: '日用品',
          name: 'L型清潔刷(附掛勾)/1入',
          shelfTime: new Date('2025-07-02T15:41:00Z')
        }
      ];
      this.isLoading = false;
      this.showLoadingComplete();
    }, 2000);
  }

  onBtnShowAllClick(): void {
    this.router.navigate([this.baseUrl.appPlugin, 'lobby']);
  }

  async onItemClick(item: Product) {
    const modal = await this.modalCtrl.create({
      component: DemoDialog,
      componentProps: {
        name: '產品詳細資訊',
        productName: item.category + ' - ' + item.name,
      },
    });
    modal.onDidDismiss().then(() => {
      UofxConsole.log('LobbyPage onClick', item);
    });
    await modal.present();
  }

  showLoadingComplete(): void {
    this.toastCtrl.create({
      message: '外掛面板成功載入!',
      duration: 2000,
    }).then(toast => toast.present());
  }

}

interface Product {
  id: string;
  category: string;
  name: string;
  shelfTime: Date;
}
