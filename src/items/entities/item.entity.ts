import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('items')
export class Item {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ default: 0 })
    quantity!: number;

    @ManyToOne(() => Product, (product) => product.items, { onDelete: 'CASCADE' })
    product!: Product;

    @Column()
    productId!: number;
}
