export interface CreateProductDto {
  name: string;
  price: number;
  quantity?: number;
  photo: string;
  description: string;
}

export interface Product extends CreateProductDto {
  id: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  quantity?: number;
  photo?: string;
  description?: string;
}
