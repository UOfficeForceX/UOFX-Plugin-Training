import * as CryptoJS from 'crypto-js';

import { Helper, UofxConsole } from '@uofx/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

export const BASIC_HTTP_HANDLER = new InjectionToken<HttpHandler>('BASIC_HTTP_HANDLER');

@Injectable()
export class BasicHttpHandler implements HttpHandler {
  constructor(protected next: HttpHandler) { }
  serverUrl: string;
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    // 檢查 Server Url
    if (this.serverUrl) {
      // 重設請求
      req = req.clone({
        // 若需要新增自訂 Header 存取 API，可以取消註解下行
        // headers: new HttpHeaders({...}),
        url: req.url.replace('~/api', Helper.replaceUrlDoubleSlash(`${this.serverUrl}/api`))
      });
    } else {
      UofxConsole.error('Please setup serverUrl!');
    }
    return this.next.handle(req);
  }
}

export class EmployeeHttpHandler extends BasicHttpHandler {

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    // 檢查 Server Url
    if (this.serverUrl) {
      // 重設 Header 和 Url
      req = req.clone({
        headers: this.setSignatureHeader(),
        url: req.url.replace('~/api', Helper.replaceUrlDoubleSlash(`${this.serverUrl}/api`))
      });
    } else {
      UofxConsole.error('Please setup serverUrl!');
    }
    return this.next.handle(req);
  }

  /** 設定 Http Request Header  */
  private setSignatureHeader(): HttpHeaders {
    const clientId = 'SampleAdvanced_clientId';
    const times = new Date().getTime().toString();
    const nonce = 'SampleAdvanced_nonce';

    const apiKey = "SampleAdvanced";
    const message = `${clientId}${times}${nonce}`;
    const signature = CryptoJS.HmacSHA512(message, apiKey).toString();

    return new HttpHeaders({
      'X-ClientId': clientId,
      'X-Timestamp': times,
      'X-Signature': signature,
      'X-Nonce': nonce
    });
  }
}
