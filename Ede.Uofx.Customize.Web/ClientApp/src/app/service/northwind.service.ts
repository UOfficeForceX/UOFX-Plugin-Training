import { BasicApiService } from "./basic/basic-api.service";
import { BasicHttpClient } from "./basic/basic-http-client";
import { CustomerModel, ProductModel } from "@model/northwind.model";
import { Injectable } from "@angular/core";
import { PlugExternalProxyReqModel, UofxPluginApiService } from "@uofx/plugin/api";

@Injectable()
export class NorthWindService extends BasicApiService {

  constructor(http: BasicHttpClient, private pluginService: UofxPluginApiService) {
    super(http);
  }

  // ─── 透過 BasicHttpClient 呼叫本外掛後端 ───────────────────
  // 適用情境：API 由本外掛的 .NET 後端提供，需要簽章驗證（MyHttpHandler）

  /**
   * 取得指定客戶資料(輸入:PICCO)
   * @param {string} customerId
   */
  getCustomerById(customerId: string) {
    return this.http.get<CustomerModel>(`~/api/northwind/customer/${customerId}`);
  }

  // ─── 透過 externalProxy 呼叫外部 API ────────────────────────────
  // 適用情境：API 由外部系統提供，透過後端「外部連線設定」代理轉發
  // 在 Service 封裝 PlugExternalProxyReqModel，Component 只需呼叫方法即可

  /**
   * 取得所有客戶（GET）
   */
  getAllCustomers() {
    return this.pluginService.externalProxy(<PlugExternalProxyReqModel>{
      connCode: '外部連線設定的連線代號',
      method: 'GET',
      apiUrl: `${this.http.serverUrl}/這是實際要呼叫的 API 網址`,
      requestBody: null
    });
  }

  /**
   * 新增客戶（POST）
   * @param {CustomerModel} model 客戶 model
   */
  addCustomer(model: CustomerModel) {
    return this.pluginService.externalProxy(<PlugExternalProxyReqModel>{
      connCode: '外部連線設定的連線代號',
      method: 'POST',
      apiUrl: `${this.http.serverUrl}/這是實際要呼叫的 API 網址`,
      requestBody: JSON.stringify(model),
    });
  }

  /**
   * 更新客戶資料（PUT）
   * @param {CustomerModel} model 客戶 model
   */
  updateCustomer(model: CustomerModel) {
    return this.pluginService.externalProxy(<PlugExternalProxyReqModel>{
      connCode: '外部連線設定的連線代號',
      method: 'PUT',
      apiUrl: `${this.http.serverUrl}/這是實際要呼叫的 API 網址`,
      requestBody: JSON.stringify(model),
    });
  }

  /**
   * 刪除客戶（DELETE）
   * @param {string} customerId 客戶id
   */
  deleteCustomer(customerId: string) {
    return this.pluginService.externalProxy(<PlugExternalProxyReqModel>{
      connCode: '外部連線設定的連線代號',
      method: 'DELETE',
      apiUrl: `${this.http.serverUrl}/這是實際要呼叫的 API 網址/${customerId}`,
    });
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
