import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsInt()
    userId!: number;
}
