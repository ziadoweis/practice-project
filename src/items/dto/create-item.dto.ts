import { IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    name!: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    quantity?: number;

    @IsInt()
    productId!: number;
}
