import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { RulesModule } from 'src/rules/rules.module';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
  imports: [CategoriesModule, ProductsModule, RulesModule]
})
export class SeedsModule {}
