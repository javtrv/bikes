import { Injectable, NotFoundException } from '@nestjs/common';
import { validate as isUUID } from 'uuid';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handleDBError } from 'src/common/helpers/helpers';

@Injectable()
export class CategoriesService {
  
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ){}

  
  
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { products, ...categoryDetails } = createCategoryDto;
      const newCategory = this.categoryRepository.create(categoryDetails);
      newCategory.products = [];
      const category = await this.categoryRepository.save(newCategory);
      return category;
    } catch (error) {
      handleDBError(error, 'Category');
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.categoryRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let category: Category;
    if (isUUID(term)) {
      category = await this.categoryRepository.findOneBy({ id:term });
    } else {
      const queryBuilder = this.categoryRepository.createQueryBuilder();
      category = await queryBuilder
        .where('Category.name = :term', { term })
        .leftJoinAndSelect('Category.products', 'products')
        .getOne();
    }

    if (!category) {
      throw new NotFoundException(`Category not with search team: ${term}, not found`);
    }
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `NOT IMPLEMENTED - This action updates a #${id} category`;
  }

  remove(id: string) {
    return `NOT IMPLEMENTED - This action removes a #${id} category`;
  }

  async deleteAllCategories() {
    const query = this.categoryRepository.createQueryBuilder('category');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      handleDBError(error, 'Category');
    }
  }
}
