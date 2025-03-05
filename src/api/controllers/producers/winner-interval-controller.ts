import { IController } from "../../interfaces/controller";
import { IHttpResponse } from "../../interfaces/http-response";
import { WinnerIntervalService } from "../../../domain/services/producers/winner-interval.service";
import { ok } from "../../http-response-methods";

export class WinnerIntervalController implements IController {
    constructor(private readonly winnerIntervalService : WinnerIntervalService) {}

    async handle (httpRequest: any): Promise<IHttpResponse> {
        const winnersMinMaxIntervalsOutput = await this.winnerIntervalService.getWinnersMinMaxIntervals();
        return ok(winnersMinMaxIntervalsOutput);
    }
}