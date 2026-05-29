import { UofxUserSetModel } from "@uofx/web-components/user-select";
import { UofxFileGroupModel } from '@uofx/web-components/file';

/** 屬性 model */
export interface InspectFieldCompleteExProps {
  /** 檢驗數量預設值 */
  defaultQuantity: number;
}

/** 填寫 model */
export interface InspectFieldCompleteFillModel {
  /** 評語 */
  comment: string;
  /** 檢驗數量 */
  inspQuantity: number;
  /** 檢驗結果 */
  inspResult: string;
  /** 產品 */
  inspProduct: string;
  /** 檢驗日期 */
  inspDate: Date;
  /** 檢驗人員 */
  inspector: Array<UofxUserSetModel>;
  /** 檢驗報告 */
  inspReport: UofxFileGroupModel;
}
