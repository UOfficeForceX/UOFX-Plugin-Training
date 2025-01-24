import { Component, OnInit } from '@angular/core';
import { BpmFwWriteComponent } from "@uofx/web-components/form";
import { UofxDialogController, UofxDialogOptions } from '@uofx/web-components/dialog';
import { ProductListCompleteComponent } from './_dialog/product-list-complete/product-list-complete.component';
import { EmployeeService } from '@service/employee.service';
import { ProductModel } from '@model/northwind.model';

@Component({
  selector: 'app-order-field-complete.write',
  templateUrl: './order-field-complete.write.component.html',
  styleUrl: './order-field-complete.write.component.scss'
})
export class OrderFieldCompleteWriteComponent extends BpmFwWriteComponent implements OnInit {

  /** 錯誤訊息 */
  errorMessage: string[] = [];
  selectedProducts: ProductModel[] = [];

  constructor(
    private dialogCtrl: UofxDialogController,
    private empService: EmployeeService) {
    super();
  }

  ngOnInit() {
    // 呼叫api之前要設定serverUrl為外掛欄位站台位址
    this.empService.serverUrl = this.pluginSetting?.entryHost;
    if (this.value && this.value.selectedProducts) {
      this.selectedProducts = this.value.selectedProducts;
    }
  }

  // 開啟商品列表 dialog
  showDialog() {
    this.dialogCtrl.create(<UofxDialogOptions>{
      component: ProductListCompleteComponent,
      size: 'large',
      params: { data: this.selectedProducts }
    }).afterClose.subscribe({
      next: res => {
        res ? this.selectedProducts = res : null;
      }
    });
  }

  /**
   * 表單送出前會呼叫此函式做檢查
   * @param {boolean} checkValidator 按下表單下方按鈕時是否要檢查表單驗證
   * @return {*}  {Promise<boolean>}
   */
  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    this.errorMessage = [];
    let order = {
      selectedProducts: this.selectedProducts,
      orderDetails: this.selectedProducts.map(product => ({
        productID: product.productID,
        quantity: product.quantity,
        unitPrice: product.unitPrice
      }))
    };

    // 真正送出欄位值變更的函式
    this.valueChanges.emit(order);

    return new Promise(resolve => {
      if (checkValidator) {
        this.checkQuantity() ? resolve(true) : resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  /**
   * 檢查商品數量
   *
   * @memberof OrderFieldWriteComponent
   */
  checkQuantity(): boolean {
    let valid: boolean = true;
    if (this.selectedProducts.length > 0) {
      this.selectedProducts.forEach(product => {
        if (!product.quantity || product.quantity < 1) {
          valid = false;
          product.valid = false;
          this.errorMessage.push(`請填入 ${product.productName} 商品數量，數量不可為 0。`);
        }
      });
    } else {
      valid = false;
      this.errorMessage.push(`至少選擇一筆商品。`);
    }
    return valid;
  }
}
