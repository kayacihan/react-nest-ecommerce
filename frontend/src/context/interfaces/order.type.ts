export type ProductDto = {
  id: string;
  quantity: number;
};

export type OrderDto = {
  address: string;
  date: string;
  products: ProductDto[];
};
