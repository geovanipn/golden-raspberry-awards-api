import { Request, Response } from 'express';
import { IController } from "../../api/interfaces/controller";
import { IHttpResponse } from "../../api/interfaces/http-response";

export const adaptRouteHandler = (controller: IController) => {
    return async (req: Request, res: Response) => {
        try {
            const { body, query, params } = req;
            const request = {
                ...body || {},
                ...query || {},
                ...params || {},
            };

            const httpResponse: IHttpResponse = await controller.handle(request);

            if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
                res.status(httpResponse.statusCode).json(httpResponse.body);
            } else {
                res.status(httpResponse.statusCode).json({error: httpResponse.body.message});
            }
        } catch (error) {
            console.error('Error handling request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
};
