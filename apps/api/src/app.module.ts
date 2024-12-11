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
      // url: process.env.DB_URL,
      // Ponemos la url de la base de datos en render
      // solo para efectos de demostracion y facilitar el uso
      // pero debe venis de una variable de entorno para seguridad
      url:'postgresql://bikesdb_user:XlWWJLrbFr1QMJDKGU4pavqguGTxOlBP@dpg-ctcmbddds78s739gnhhg-a.frankfurt-postgres.render.com/bikesdb?ssl=true',
      entities: [__dirname + '/../**/*.entity.js'],
    // Con esta configuracion nos conectamos a la base de datos en local para desarrollar
    // host: process.env.DB_HOST,
    // port: +process.env.DB_PORT,
    // database: process.env.DB_NAME,
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // autoLoadEntities: true,
    // synchronize: process.env.NODE_ENV !== 'production',
    }),
    CategoriesModule,
    CommonModule,
    SeedsModule,
    ProductsModule,
    RulesModule,
  ],
})
export class AppModule {}
