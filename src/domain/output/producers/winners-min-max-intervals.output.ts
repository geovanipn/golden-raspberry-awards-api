export interface ProducerWinnerIntervalOutput {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface WinnersMinMaxIntervalsOutput {
    min: ProducerWinnerIntervalOutput[];
    max: ProducerWinnerIntervalOutput[];
}