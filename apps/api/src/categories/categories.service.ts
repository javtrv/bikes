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

  // This can be improved in the future to update the order of all categories
  // when a is inserted in the middle of the list
  async updateOrder(category: Category) {
    // We update the order of the category to the last position
    const allCategories = await this.categoryRepository.find();
    await this.update(category.id, { order: allCategories.length });
  }
  
  async create(createCategoryDto: CreateCategoryDto, seed: boolean = false) {
    try {
      const oldCategory = await this.categoryRepository.findOne({ where: { order: createCategoryDto.order } });
      
      const { products, ...categoryDetails } = createCategoryDto;
      const newCategory = this.categoryRepository.create(categoryDetails);
      newCategory.products = [];
      const category = await this.categoryRepository.save(newCategory);
      
      // Check if category with order already exists and update
      // Only for real data and not seed data
      if(!seed && oldCategory){
          await this.updateOrder(oldCategory);
      }

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
      order: { order: 'ASC' },
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload(
      {
        id: id,
        ...updateCategoryDto,
        products: updateCategoryDto.products ? updateCategoryDto.products.map(productId => ({ id: productId })) : undefined,
      }
    )

    if (!category) {
      throw new NotFoundException(`Category with id: ${id} not found`);
    }

    return this.categoryRepository.save(category);
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
