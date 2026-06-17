
/** 客戶 model */
export interface CustomerModel {
  /** 客戶id */
  customerId: string;
  /** 公司名稱 */
  companyName: string;
  /** 聯絡人 */
  contactName: string;
  /** 手機 */
  phone: string;
}

/** 商品 model */
export interface ProductModel {
  /** 商品id */
  productID: number;
  /** 商品名稱 */
  productName: string;
  /** 單價 */
  unitPrice: number;
  /** 庫存 */
  unitsInStock: number;
  /** 數量 */
  quantity: number;
}
