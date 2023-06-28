import { KeyValue, ApiMethod } from "../types";
import { APIMethod } from "../constants";

export class APIService {
  private _authToken: string | undefined;
  private _headers: [string, string][] = [];
  private _method: ApiMethod = APIMethod.GET;

  constructor(authToken?: string) {
    this._authToken = authToken;
  }

  public setHeaders(headers: KeyValue<string, string>[]): APIService {
    if (this._authToken) {
      this._headers.push(["Authorization", "Bearer " + this._authToken]);
    }
    for (const i in headers) {
      if (
        headers[i].hasOwnProperty("key") &&
        headers[i].hasOwnProperty("value")
      ) {
        this._headers.push([headers[i].key, headers[i].value]);
      }
    }

    return this;
  }

  get headers(): string[][] {
    return this._headers;
  }

  public resetHeaders(): void {
    this._headers = [];
  }

  public setMethod(newMethod: APIMethod): APIService {
    this._method = newMethod;
    return this;
  }

  public request<T>(body?: T): RequestInit {
    return this._method === APIMethod.GET
      ? {
          headers: this._headers,
          method: this._method,
        }
      : {
          headers: this._headers,
          method: this._method,
          body: JSON.stringify(body),
        };
  }
}
