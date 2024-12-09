export type KeyValue = {
  [key: string]: string;
};

export type Category = {
  id: string;
  name: string;
  products: Partial<Product>[];
  order: number; 
}

export type Product = {
  id: string;
  name: string;
  category: Partial<Category>;
  rules?: Rule[];
}

export type ProductDto = {
  name: string;
  category: string;
}

export type Rule =  {
  id: string;
  type: string;
  amout: string;
  productList: string[];
}

export const ELEMENTS = {
  PRODUCT: 'product',
  CATEGORY: 'category',
  RULE: 'rule',
} as const;