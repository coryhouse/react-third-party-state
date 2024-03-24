export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  skus: Sku[];
};

type Sku = {
  sku: string;
  size: number;
};
