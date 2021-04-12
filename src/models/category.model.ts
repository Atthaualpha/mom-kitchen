import {Entity, Column ,PrimaryColumn} from 'typeorm'

@Entity({schema: 'management'})
export class Category {

    @PrimaryColumn()
    id: Number

    @Column()
    name: string;
}