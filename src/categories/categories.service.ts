import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateCategoryDto) {
    await this.usersService.findOne(dto.userId);
    const category = this.categoriesRepository.create(dto);
    return this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find({ relations: { products: true } });
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: { products: true },
    });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return category;
  }

  findByUser(userId: number) {
    return this.categoriesRepository.find({ where: {userId} });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.findOne(id);
    await this.categoriesRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoriesRepository.remove(category);
  }
}
