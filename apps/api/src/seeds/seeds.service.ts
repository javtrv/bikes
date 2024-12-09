import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { initialCategories } from './data/category-seed';
import { ProductsService } from 'src/products/products.service';
import { initialProducts } from './data/products-seed';
import { RulesService } from 'src/rules/rules.service';
import { initialRules } from './data/rule-seed';
import { CreateRuleDto } from 'src/rules/dto/create-rule.dto';

@Injectable()
export class SeedsService {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly productService: ProductsService,
    private readonly rulesService: RulesService,
  ) { }


  async executeSeed() {
    await this.rulesService.deleteAllRules();
    await this.productService.deleteAllProducts();
    await this.categoryService.deleteAllCategories();

    await this.insertNewCategories();
    await this.insertNewProducts();
    await this.insertNewRules();

    return 'SEED EXECUTED';

  }

  private async insertNewCategories() {

    const insertPromises = [];

    initialCategories.forEach(async category => {
      insertPromises.push(this.categoryService.create(category, true));
    })

    await Promise.all(insertPromises);

    return true;
  }

  private async insertNewProducts() {

    const insertPromises = [];

    initialProducts.forEach(async product => {
      insertPromises.push(this.productService.create(product));
    })

    await Promise.all(insertPromises);

    return true;
  }

  private async insertNewRules() {

    const insertPromises = [];

    initialRules.forEach(async rule => {
      insertPromises.push(this.rulesService.create(rule as CreateRuleDto));
    })

    await Promise.all(insertPromises);

    return true;
  }
}
