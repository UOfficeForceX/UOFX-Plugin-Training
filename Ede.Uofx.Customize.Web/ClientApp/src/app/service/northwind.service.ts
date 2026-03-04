import { BasicApiService } from "./basic/basic-api.service";
import { CustomerModel, ProductModel } from "@model/northwind.model";
import { Injectable } from "@angular/core";

@Injectable()
export class NorthWindService extends BasicApiService {

  /**
   * 取得指定客戶資料(輸入:PICCO)
   * @param {string} customerId
   * @return {*}
   * @memberof NorthWindService
   */
  getCustomerById(customerId: string) {
    return this.http.get<CustomerModel>(`~/api/northwind/customer/${customerId}`);
  }

  /**
   * 新增客戶
   * @param {CustomerModel} model 客戶 model
   * @return {*}
   * @memberof NorthWindService
   */
  addCustomer(model: CustomerModel) {
    return this.http.post('~/api/northwind/customer/add', model);
  }

  /**
   * 更新客戶資料
   * @param {CustomerModel} model 客戶 model
   * @return {*}
   * @memberof NorthWindService
   */
  updateCustomer(model: CustomerModel) {
    return this.http.put<CustomerModel>('~/api/northwind/customer/update', model);
  }

  /**
   * 刪除客戶
   * @param {string} customerId 客戶id
   * @return {*}
   * @memberof NorthWindService
   */
  deleteCustomer(customerId: string) {
    return this.http.delete<boolean>(`~/api/northwind/customer/delete/${customerId}`);
  }


  /**
   * 取得所有客戶資料
   * @returns {*}
   * @memberof NorthWindService
   */
  getCustomers() {
    return this.http.get<Array<CustomerModel>>('~/api/northwind/customers');
  }

  /**
   * 取得商品列表
   * @return {*}
   * @memberof NorthWindService
   */
  getProducts() {
    return this.http.get<Array<ProductModel>>('~/api/northwind/products');
  }
}
