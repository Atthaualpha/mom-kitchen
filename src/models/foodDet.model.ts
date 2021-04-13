import { Item } from './item.model';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity({schema: 'management', name: 'foot_det'})
export class FootDet {
    
    @PrimaryColumn()
    id: number;

    @Column()
    time: string;

    @Column()
    serving: number;

    @OneToOne(() => Item)
    @JoinColumn({name: 'item_id'})
    item: Item
}