/** 外部起單 request model */
export interface ApplyFormResModel {
  /** 帳號 */
  account: string;
  /** 申請者部門代號 */
  deptCode: string;
  /** 客製資訊(也可組成json傳入) */
  customData: string;
  /** 有附件時請填入完整的檔案路徑ex: D:\sample\sample.pdf */
  filePath?: string;
}

/** Callback成功資料 */
export interface CallbackResultModel {
  /** SDK 類型 */
  type: string;
  /** callback json資料 */
  data: string;
}
