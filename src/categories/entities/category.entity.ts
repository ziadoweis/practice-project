import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
    user!: User;

    @Column()
    userId!: number;

    @OneToMany(() => Product, (product) => product.category)
    products!: Product[];
}
