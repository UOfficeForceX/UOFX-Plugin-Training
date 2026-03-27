import { ApplyFormResModel, CallbackResultModel } from "@model/sdk.model";

import { BasicApiService } from "./basic/basic-api.service";
import { Injectable } from "@angular/core";

@Injectable()
export class SdkService extends BasicApiService {

  /**
   * 外部起單
   * @param {ApplyFormResModel} model 外部起單 request model
   * @return {*} 回傳 trace id
   * @memberof SdkService
   */
  applyForm(model: ApplyFormResModel) {
    return this.http.post<string>('~/api/sdk/applyForm', model);
  }

  /**
   * 取得 callback 結果
   * @return {*} Array<CallbackResultModel> callback 結果
   * @memberof SdkService
   */
  getCallbackResult() {
    return this.http.get<Array<CallbackResultModel>>('~/api/sdk/result');
  }
}
