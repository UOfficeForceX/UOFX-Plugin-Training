import { Component, OnInit } from '@angular/core';
import { ProductModel } from '@model/northwind.model';
import { NorthWindService } from '@service/northwind.service';
import { UofxDialog } from '@uofx/web-components/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent extends UofxDialog implements OnInit {
  /** 商品列表 */
  products: ProductModel[] = [];
  /** 已選擇商品 */
  selectedProduct: string;

  constructor(private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit() {
    // 將傳入參數帶入已選擇商品變數
    if (this.params.data) this.selectedProduct = this.params.data
    // 初始化時取得商品列表
    this.getProducts();
  }

  /** 取得商品列表 */
  getProducts() {
    this.northWindServ.getProducts().subscribe({
      next: res => {
        this.products = res;
      }
    });
  }

}
