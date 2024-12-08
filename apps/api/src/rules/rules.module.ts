import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';

@Module({
  controllers: [RulesController],
  providers: [RulesService],
  imports: [  
    TypeOrmModule.forFeature([
      Rule
    ])
    ,ProductsModule
  ],
  exports: [
    RulesService,
    TypeOrmModule  
  ]
})
export class RulesModule {}
