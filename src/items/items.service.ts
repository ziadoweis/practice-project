import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private productsService: ProductsService,
  ) {}

  async create(dto: CreateItemDto) {
    await this.productsService.findOne(dto.productId);
    const item = this.itemsRepository.create(dto);
    return this.itemsRepository.save(item);
  }

  findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item ${id} not found`);
    return item;
  }

  findByProduct(productId: number) {
    return this.itemsRepository.find({ where: { productId } });
  }

  async update(id: number, dto: UpdateItemDto) {
    await this.findOne(id);
    await this.itemsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.itemsRepository.remove(item);
  }
}
