import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('int', { default: 0 })
  order?: number;

  @OneToMany(
    () => Product,
    (product) => product.category,
    {
      cascade: true,
      eager: true
    }
  )
  products?: Product[];

}
