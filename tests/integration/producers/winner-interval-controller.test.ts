import request from 'supertest';
import { Repository } from "typeorm";
import { Movie } from "../../../src/domain/entities/movie.entity";
import app from "../../../src/main/config/app";
import SqliteDataBase from "../../../src/infra/database/sqlite";

describe('WinnerIntervalController: Get Producers Winners intervals min and max', () => {
    let movieRepository: Repository<Movie>;

    beforeAll(async () => {
        await SqliteDataBase.initialize();
        movieRepository = SqliteDataBase.getRepository(Movie);
    });

    afterEach(async () => {
        await movieRepository.clear();
    });

    afterAll(async () => {
        await SqliteDataBase.destroy();
    });

    it('Should return the producers with the longest gap between two consecutive awards,\n ' +
        'and the producers who obtained two awards with the lowest interval', async () => {
        // arrange
        const mockMovies = [
            {title:'', studios:'', producers: 'Pedro, Mica and Luana', year: 1990, winner: true},
            {title:'', studios:'', producers: 'Pedro, Mica and Maria', year: 1991, winner: true},
            {title:'', studios:'', producers: 'Pedro, Joana and Rosa', year: 2000, winner: true},
            {title:'', studios:'', producers: 'Fernando', year: 1970, winner: true},
            {title:'', studios:'', producers: 'Fernando', year: 1971, winner: true},
            {title:'', studios:'', producers: 'Pedro', year: 1982, winner: true},
        ]
        const expectedResult = {
            "min": [
                {
                    "producer": "Pedro",
                    "interval": 1,
                    "previousWin": 1990,
                    "followingWin": 1991
                },
                {
                    "producer": "Mica",
                    "interval": 1,
                    "previousWin": 1990,
                    "followingWin": 1991
                },
                {
                    "producer": "Fernando",
                    "interval": 1,
                    "previousWin": 1970,
                    "followingWin": 1971
                },
            ],
            "max": [
                {
                    "producer": "Pedro",
                    "interval": 9,
                    "previousWin": 1991,
                    "followingWin": 2000
                }
            ]
        };

        await movieRepository.insert(mockMovies);

        // act
        const response = await request(app)
            .get('/producers/winners/intervals');

        // assert
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResult);
    });

    it('Should return empty result, producers without consecutive awards', async () => {
        // arrange
        const mockMovies = [
            {title:'', studios:'', producers: 'Mica', year: 1971, winner: true},
            {title:'', studios:'', producers: 'Fernando', year: 1999, winner: true},
            {title:'', studios:'', producers: 'Pedro', year: 1982, winner: true},
        ]
        const expectedResult = { "min": [], "max": [] };
        await movieRepository.insert(mockMovies);

        // act
        const response = await request(app)
            .get('/producers/winners/intervals');

        console.log(response.body);

        // assert
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResult);
    });
});