import { Component, OnInit } from "@angular/core";
import { UofxDialog } from "@uofx/web-components/dialog";
import { NorthWindService } from "@service/northwind.service";
import { ProductModel } from "@model/northwind.model";

@Component({
  selector: 'app-product-list-complete',
  templateUrl: './product-list-complete.component.html',
  styleUrl: './product-list-complete.component.scss'
})
export class ProductListCompleteComponent extends UofxDialog implements OnInit {

  productList: ProductModel[] = [];
  selectedProducts: ProductModel[] = [];

  constructor(
    private northWindServ: NorthWindService
  ) {
    super();
  }

  ngOnInit() {
    this.getProducts();
    this.params.data.length > 0 ? this.selectedProducts = this.params.data : null;
  }

  canClose() {
    this.close();
    return true;
  }

  // 點擊新增 or 修改
  onSaveClick() {
    this.close(this.selectedProducts);
  }

  /**
   * 取得商品列表
   *
   * @memberof ProductListComponent
   */
  getProducts() {
    this.northWindServ.getProducts().subscribe({
      next: res => {
        this.productList = res;
      }
    });
  }
}
