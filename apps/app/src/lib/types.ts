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
  category: string;
}