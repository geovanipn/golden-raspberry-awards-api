import { IHttpResponse } from "./http-response";

export interface IController<T = any> {
    handle: (httpRequest: T) => Promise<IHttpResponse>
}
