import { BasicApiService } from "@service/basic/basic-api.service"
import { Injectable } from '@angular/core';
import { UofxConsole } from "@uofx/core";

@Injectable()
export class EmployeeService extends BasicApiService {
  /**
   * 取得合法的員工編號
   * @returns 合法的員工編號
   */
  getValidEmpNumber() {
    // TODO: 呼叫之前需先設定serverUrl
    UofxConsole.log('EmployeeService getValidEmpNumber', this.http.serverUrl);

    return this.http.get<Array<string>>('~/api/emp/validemp');
  }
}
