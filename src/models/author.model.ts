import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'management' })
export class Author {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string
}
