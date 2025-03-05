import SqliteDataBase from "../../../../infra/database/sqlite";
import { IController } from "../../../../api/interfaces/controller";
import { WinnerIntervalController } from "../../../../api/controllers/producers/winner-interval-controller";
import { WinnerIntervalService } from "../../../../domain/services/producers/winner-interval.service";
import { Movie } from "../../../../domain/entities/movie.entity";

export const createWinnersIntervalController = (): IController => {
    const movieRepository = SqliteDataBase.getRepository(Movie);
    const winnerIntervalService = new WinnerIntervalService(movieRepository);

    return new WinnerIntervalController(winnerIntervalService);
}