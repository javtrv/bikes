import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { SeedsModule } from './seeds/seeds.module';
import { ProductsModule } from './products/products.module';
import { RulesModule } from './rules/rules.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'app/dist'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    CategoriesModule,
    CommonModule,
    SeedsModule,
    ProductsModule,
    RulesModule,
  ],
})
export class AppModule {}
