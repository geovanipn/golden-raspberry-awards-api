import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title!: string;

    @Column()
    studios!: string;

    @Column()
    producers!: string;

    @Column({ default: false })
    winner!: boolean;

    @Column()
    year!: number;
}