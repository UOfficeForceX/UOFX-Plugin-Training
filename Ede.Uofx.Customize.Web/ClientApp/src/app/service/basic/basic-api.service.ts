import { Helper, UofxConsole } from '@uofx/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

import { BasicHttpClient } from './basic-http-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class CusHttpHandler implements HttpHandler {
  constructor(protected next: HttpHandler) { }
  serverUrl: string;

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    // 檢查 Server Url
    if (this.serverUrl) {
      // 重設 Header 和 Url
      req = req.clone({
        url: req.url.replace('~/api', Helper.replaceUrlDoubleSlash(`${this.serverUrl}/api`))
      });
    } else {
      UofxConsole.error('Please setup serverUrl!');
    }
    return this.next.handle(req);
  }
}

/**
 * 自訂的 API 需要獨立存取，Service 需繼承 BasicApiService，使用額外定義的 Http Client 發送請求。
 * @class BasicApiService
 */
@Injectable()
export abstract class BasicApiService {
  public set serverUrl(url: string) {
    this.http.serverUrl = url || '';
  }

  constructor(public http: BasicHttpClient) { }
}
