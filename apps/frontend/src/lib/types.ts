export type KeyValue = {
  [key: string]: string;
};

export type Category = {
  id: string;
  name: string;
  products: Partial<Product>[];
  order: number; 
}

export type CategoryDto = {
  name: string;
  order: number;
}

export type Product = {
  id: string;
  name: string;
  price: string;
  category: Partial<Category>;
  rules?: Rule[];
}

export type ProductDto = {
  name: string;
  price: number;
  category: string;
}

export type Rule =  {
  id: string;
  type: string;
  amount: string;
  productList: string[];
}

export type RuleDto = {
  product: {
    id: string;
  }
  type: string;
  amount: number;
  productList: string[];
}

export const ELEMENTS = {
  PRODUCT: 'product',
  CATEGORY: 'category',
  RULE: 'rule',
} as const;
