import { BasicHttpClient } from './basic-http-client';
import { Injectable } from '@angular/core';

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
