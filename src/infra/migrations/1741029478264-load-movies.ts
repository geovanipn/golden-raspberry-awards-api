import * as fs from "node:fs";
import csv from 'csv-parser';
import { join } from "path";
import { MigrationInterface, QueryRunner } from "typeorm";
import { Movie } from "../../domain/entities/movie.entity";

export class LoadMovies1741029478264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const results: any[] = [];

        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(join(__dirname, './data/movies.csv'))
                .pipe(csv({separator: ';'}))
                .on('data', (data) => results.push(data))
                .on('end', () => resolve())
                .on('error', (error) => reject(error));
        });

        const movieData = results.map(row => ({
            year: parseInt(row.year, 10),
            title: row.title,
            studios: row.studios,
            producers: row.producers,
            winner: row.winner === 'yes',
        }));

        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Movie)
            .values(movieData)
            .execute();

        console.log("Movies loaded!");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM movie`);
    }
}
