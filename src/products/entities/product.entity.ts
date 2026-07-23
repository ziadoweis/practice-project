import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Item } from '../../items/entities/item.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
    category!: Category;

    @Column()
    categoryId!: number;

    @OneToMany(() => Item, (item) => item.product)
    items!: Item[];
}
