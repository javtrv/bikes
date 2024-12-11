import { Injectable, NotFoundException } from '@nestjs/common';
import { validate as isUUID } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { handleDBError } from 'src/common/helpers/helpers';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly categoryService: CategoriesService,
  ){}

  async create(createProductDto: CreateProductDto) {
    const { category, ...productDetails } = createProductDto;
    const categoryExists = await this.categoryService.findOne(category);
    
    try {
      const newProduct = this.productRepository.create({
        ...productDetails,
        category: categoryExists
      });

      categoryExists.products = [...categoryExists.products, newProduct];

      const product = await this.productRepository.save(newProduct);
      return product;
    } catch (error) {
      handleDBError(error, 'Product');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 20, offset = 0 } = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
      category: true
      }
    });

    return products.map(product => ({
      ...product,
      category: { id: product.category.id, name: product.category.name, order: product.category.order }
    }));
  }

  async findOne(term: string) {
    let product: Product;
    if (isUUID(term)) {
      product = await this.productRepository.findOne({
        where: { id: term },
        relations: ['category']
      });
      product.category = { id: product.category.id, name: product.category.name };
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where('Product.name ILIKE :term', { term: `%${term}%` })
        .leftJoinAndSelect('Product.category', 'category')
        .getOne();
    }

    if (!product) {
      throw new NotFoundException(`Product with search team: ${term}, not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productRepository.preload(
      {
        id: id,
        ...updateProductDto,
        category: updateProductDto.category ? { id: updateProductDto.category } : undefined
      }
    )

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    return this.productRepository.remove(product);
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      handleDBError(error, 'Product');
    }
  }


  async validateProducts(productsIds: string[]) {
    const invalidProducts = [];
  
    for (const id of productsIds) {
      try {
        await this.findOne(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          invalidProducts.push(id);
        } else {
          throw error;
        }
      }
    }
  
    if (invalidProducts.length > 0) {
      throw new NotFoundException(`Products with ids: ${invalidProducts.join(', ')} not found`);
    }
  }
}
