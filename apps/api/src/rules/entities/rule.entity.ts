import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Rule' })
export class Rule {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  type: string;

  @Column('numeric')
  amount: number;

  @Column('json')
  productList: string[];

  @ManyToOne(
    () => Product,
    (product) => product.rules,
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;

}
