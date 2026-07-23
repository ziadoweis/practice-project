import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async create(dto: CreateProductDto) {
    await this.categoriesService.findOne(dto.categoryId);
    const product = this.productsRepository.create(dto);
    return this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find({ relations: { items: true } });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { items: true },
    });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  findByCategory(categoryId: number) {
    return this.productsRepository.find({ where: { categoryId } });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    await this.productsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }
}
