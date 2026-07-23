import { IsNotEmpty, IsInt, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsInt()
    categoryId!: number;
}
