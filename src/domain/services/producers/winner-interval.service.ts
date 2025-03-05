import { Repository } from "typeorm";
import { Movie } from "../../entities/movie.entity";
import { ProducerWinnerIntervalOutput, WinnersMinMaxIntervalsOutput } from "../../output/producers/winners-min-max-intervals.output";

export class WinnerIntervalService {
    constructor(private readonly movieRepository : Repository<Movie> ) {}

    async getWinnersMinMaxIntervals(): Promise<WinnersMinMaxIntervalsOutput> {
        const winningMovies = await this.movieRepository.find({ where: { winner: true } });
        if (winningMovies.length === 0) {
            return { min: [], max: [] };
        }

        const producersWinningYears = this.getProducersWinningYears(winningMovies);
        let minInterval = Infinity;
        let maxInterval = -Infinity;
        let minIntervals: ProducerWinnerIntervalOutput[] = [];
        let maxIntervals: ProducerWinnerIntervalOutput[] = [];

        for (const [producer, years] of producersWinningYears) {
            if (years.length < 2){
                continue;
            }

            years.sort((a, b) => a - b);
            for (let i = 1; i < years.length; i++) {
                const interval = years[i] - years[i - 1];
                const producerWinnerInterval: ProducerWinnerIntervalOutput = {
                    producer,
                    interval,
                    previousWin: years[i - 1],
                    followingWin: years[i],
                };

                if (interval <= minInterval) {
                    if (interval < minInterval) {
                        minInterval = interval;
                        minIntervals = [];
                    }
                    minIntervals.push(producerWinnerInterval);
                }

                if (interval >= maxInterval) {
                    if (interval > maxInterval) {
                        maxInterval = interval;
                        maxIntervals = [];
                    }
                    maxIntervals.push(producerWinnerInterval);
                }
            }
        }

        return { min: minIntervals, max: maxIntervals };
    }



    private getProducersWinningYears(winningMovies: Movie[]): Map<string, number[]> {
        const producersWinningYears: Map<string, number[]> = new Map();
        for (const movie of winningMovies) {
            const producers = this.splitProducers(movie.producers);
            for (const producer of producers) {
                producersWinningYears.set(producer, (producersWinningYears.get(producer) ?? []).concat(movie.year));
            }
        }

        return producersWinningYears;
    }

    private splitProducers(producersString: string | null | undefined): string[] {
        if (!producersString) {
            return [];
        }
        return producersString
            .split(/,| and /)
            .map(producer => producer.trim())
            .filter(producer => producer !== "");
    }
}