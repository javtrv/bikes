import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Rule } from './entities/rule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { handleDBError } from 'src/common/helpers/helpers';

@Injectable()
export class RulesService {


  constructor(
    @InjectRepository(Rule)
    private ruleRepository: Repository<Rule>,
    private readonly productService: ProductsService
    // private readonly categoryService: CategoriesService,
  ){}
  
  async create(createRuleDto: CreateRuleDto) {
    const { productList, ...ruleDetails } = createRuleDto;
    const { product } = ruleDetails;

    try {
      // First we check if the product exists and the product list is valid
      const productExist = await this.productService.findOne(product.id);
      await this.productService.validateProducts(productList);

      // We check if the rule already exists
      const existRule = await this.validateExistingRule(ruleDetails.type, product.id, productList);
      if (existRule) {
        throw new BadRequestException('Rule already exists for those products');
      }

      const newRule = this.ruleRepository.create({
        ...ruleDetails,
        productList,
        product
      });

      productExist.rules = [...productExist.rules, newRule];

      const rule = await this.ruleRepository.save(newRule);
      return rule;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `NOT IMPLEMENTED - This action returns all rules`;
  }

  async findOne(id: string) {
    let rule: Rule;
    rule = await this.ruleRepository.findOne({
      where: { id },
      relations: ['product']
    });

    if (!rule) {
      throw new Error(`Rule with id ${id} not found`);
    }

    return rule;

  }

  async findByProductId(productId: string) {
    const product = await this.productService.findOne(productId)
    return product.rules;
  }

  update(id: number, updateRuleDto: UpdateRuleDto) {
    return `This action updates a #${id} rule`;
  }

  async remove(id: string) {
    const rule = await this.findOne(id)
    return this.ruleRepository.remove(rule);
  }

  async deleteAllRules() {
    const query = this.ruleRepository.createQueryBuilder('rule');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      handleDBError(error, 'Rule');
    }
  }


  private async validateExistingRule(ruleType, ruleProductId: string, ruleProductList: string[]) : Promise<boolean> {
    const product = await this.productService.findOne(ruleProductId);
    let existingRules = product.rules;
    existingRules = existingRules.filter(rule => rule.type === ruleType);

    let ruleExist = false;

    for (const rule of existingRules) {
      const { productList } = rule;
      if (
        productList.length === ruleProductList.length &&
        productList.every((id) => ruleProductList.includes(id))
      ) {
        ruleExist = true;
        break;
      }
    }

    return ruleExist;
  }
}
