export interface ProductImage {
  url: string;
  altText: string;
}

export interface ProductPrice {
  wasPrice: number;
  currentPrice: number;
  currency: string;
}

export interface ProductBrand {
  brandName: string;
  brandSlug?: string;
  brandImageUrl: string;
  brandImageAltText: string;
}

export interface Product {
  id: string;
  sku: string;
  productName: string;
  slug: string;
  averageRating: number;
  image: ProductImage;
  stockStatus: string;
  price: ProductPrice;
  brand: ProductBrand;
}
