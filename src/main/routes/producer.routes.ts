import { Router } from 'express';
import { adaptRouteHandler } from "../adapters/route-handler";
import { createWinnersIntervalController } from "../factories/controllers/producers/winner-interval-controller.factory";

export default (router: Router): void => {
    router.get('/producers/winners/intervals', adaptRouteHandler(createWinnersIntervalController()));
};
