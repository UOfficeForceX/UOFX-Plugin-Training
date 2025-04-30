import { BASIC_HTTP_HANDLER, BasicHttpHandler } from './basic-http-handler';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class BasicHttpClient extends HttpClient {

  public set serverUrl(url: string) {
    this.basicNext.serverUrl = url || '';
  }

  public get serverUrl(): string {
    return this.basicNext.serverUrl;
  }

  constructor(@Inject(BASIC_HTTP_HANDLER) private basicNext: BasicHttpHandler) {
    super(basicNext);
  }
}
