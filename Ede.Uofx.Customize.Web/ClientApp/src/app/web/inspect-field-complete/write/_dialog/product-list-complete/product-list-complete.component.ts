import { Component, OnInit } from '@angular/core';
import { ProductModel } from '@model/northwind.model';
import { NorthWindService } from '@service/northwind.service';
import { UofxDialog } from '@uofx/web-components/dialog';

@Component({
  selector: 'app-product-list-complete',
  templateUrl: './product-list-complete.component.html',
  styleUrl: './product-list-complete.component.scss'
})
export class ProductListCompleteComponent extends UofxDialog implements OnInit{
  /** 商品列表 */
  products: ProductModel[] = [];
  /** 選擇的商品 */
  selectedProducts: string;

  constructor(private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit() {
    /** 初始化選擇的商品 */
    if (this.params.data) this.selectedProducts = this.params.data;
    this.getProducts();
  }

  /** 取得商品列表 */
  getProducts() {
    this.northWindServ.getProducts().subscribe({
      next: res => {
        this.products = res;
      }
    })
  }
}
