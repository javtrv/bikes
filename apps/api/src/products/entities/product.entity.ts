import { Category } from "src/categories/entities/category.entity";
import { Rule } from "src/rules/entities/rule.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @ManyToOne(
    () => Category,
    (category) => category.products,
  )
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(
    () => Rule,
    (rule) => rule.product,
    {
      cascade: true,
      eager: true
    }
  )
  rules?: Rule[];

}
