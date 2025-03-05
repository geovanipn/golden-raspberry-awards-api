import { IHttpResponse } from "../interfaces/http-response";

export const badRequest = (error: Error): IHttpResponse => ({
    statusCode: 400,
    body: error
})

export const ok = (data: any): IHttpResponse => ({
    statusCode: 200,
    body: data
})
