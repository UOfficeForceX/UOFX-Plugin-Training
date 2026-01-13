import { UofxFileGroupModel } from "@uofx/web-components/file";
import { UofxUserSetModel } from "@uofx/web-components/user-select";

/** 屬性 model */
export interface AdvancedFieldExProps {
  /** 是否顯示員工編號 */
  isShowEmpNo: boolean;
  /** 是否檢查申請日期符合區間 */
  isCheckDate: boolean;
  /** 申請日期範圍  */
  checkDays: number;
}

/** 填寫model */
export interface AdvancedFieldModel {
  /** 帳號 */
  account: string;
  /** 員工編號 */
  empNo: boolean;
  /** 行動電話 */
  mobile: string;
  /** 申請日期 */
  applyDate: Date;
  /** 職務代理人 */
  agent: UofxUserSetModel,
  /** 申請次數 */
  count: number;
  /** 附件 */
  attachments: UofxFileGroupModel
}
