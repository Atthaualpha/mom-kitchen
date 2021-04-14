import { Item } from './item.model';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity({schema: 'management', name: 'food_det'})
export class FootDet {
    
    @PrimaryColumn()
    id: number;

    @Column()
    time: string;

    @Column()
    serving: number;

    @OneToOne(() => Item, item => item.foodDet)
    @JoinColumn({name: 'item_id'})
    item: Item
}