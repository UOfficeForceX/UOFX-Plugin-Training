import { Component, OnInit } from '@angular/core';
import { BpmFwWriteComponent, UofxFormFieldLogic, UofxFormTools } from "@uofx/web-components/form";
import { UofxDialogController, UofxDialogOptions } from '@uofx/web-components/dialog';
import { ProductListCompleteComponent } from './_dialog/product-list-complete/product-list-complete.component';
import { NorthWindService } from '@service/northwind.service';
import { ProductModel } from '@model/northwind.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-field-complete.write',
  templateUrl: './order-field-complete.write.component.html',
  styleUrl: './order-field-complete.write.component.scss'
})
export class OrderFieldCompleteWriteComponent extends BpmFwWriteComponent implements OnInit {

  /** 錯誤訊息 */
  errorMessage: string[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogCtrl: UofxDialogController,
    private northWindServ: NorthWindService,
    private tools: UofxFormTools,
    private fieldLogic: UofxFormFieldLogic) {
    super();
  }

  ngOnInit() {
    // 呼叫api之前要設定serverUrl為外掛欄位站台位址
    this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      products: this.fb.array([])
    });
    this.setValue();
  }

  // 設定預設值
  setValue() {
    if (this.value && this.value.selectedProducts) {
      this.createFormArray(this.value.selectedProducts);
    }
  }

  // 建立 FormArray
  createFormArray(selectedProducts: ProductModel[]) {
    // 清空 FormArray
    const formArray = this.form.get('products') as FormArray;
    formArray.clear();

    selectedProducts.forEach(product => {
      let group = this.fb.group({
        productID: [product.productID ?? null],
        productName: [product.productName ?? null],
        unitsInStock: [product.unitsInStock ?? null],
        unitPrice: [product.unitPrice ?? null],
        quantity: [product.quantity ?? null, [Validators.required, Validators.min(1)]]
      });
      formArray.push(group);
    });

    // 綁定 ParentForm
    this.fieldLogic.parentFormBinding(this.parentForm, this.selfControl, this.form);
  }

  // 開啟商品列表 dialog
  showDialog() {
    this.dialogCtrl.create(<UofxDialogOptions>{
      component: ProductListCompleteComponent,
      size: 'large',
      params: { data: this.form.value.products }
    }).afterClose.subscribe({
      next: res => {
        if (res) this.createFormArray(res);
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
    let isValid: boolean = true;

    let order = {
      selectedProducts: this.form.value.products,
      orderDetails: this.form.value.products.map(product => ({
        productID: product.productID,
        quantity: product.quantity,
        unitPrice: product.unitPrice
      }))
    };

    // 真正送出欄位值變更的函式
    this.valueChanges.emit(order);
    this.tools.markFormGroup(this.form);
    this.fieldLogic.checkValidators(checkValidator, this.selfControl, this.form);

    if (checkValidator) {
      if (this.form.value.products.length === 0) {
        this.errorMessage.push(`至少選擇一筆商品。`);
        isValid = false;
      } else if (this.form.invalid) {
        this.errorMessage.push(`請填入商品數量，數量不可小於 1。`);
        isValid = false;
      }
    }

    return new Promise(resolve => {
      resolve(isValid);
    });
  }
}
