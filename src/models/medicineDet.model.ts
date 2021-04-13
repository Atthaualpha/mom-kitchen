import { Item } from './item.model';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity({schema: 'management', name: 'medicine_det'})
export class MedicineDet {
    
    @PrimaryColumn()
    id: number;

    @Column()
    use: string;

    @OneToOne(() => Item)
    @JoinColumn({name: 'item_id'})
    item: Item
}