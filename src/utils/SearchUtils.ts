import { Product } from "../types";

export const transformProducts = (products: any[]): Product[] => {
  return products.map((product: any) => ({
    id: product.id,
    sku: product.sku,
    productName: product.productName,
    slug: product.slug,
    averageRating: product.averageRating,
    image: {
      url: product.image?.url || "",
      altText: product.image?.attributes?.imageAltText || "",
    },
    stockStatus: product.stockStatus?.status || "",
    price: {
      wasPrice: product.price?.wasPriceIncTax || 0,
      currentPrice: product.price?.priceIncTax || 0,
      currency: product.price?.currencyCode || "",
    },
    brand: {
      brandName: product.brand?.name || "",
      brandSlug: product.brand?.slug || "",
      brandImageUrl: product.brand?.brandImage?.url || "",
      brandImageAltText:
        product.brand?.brandImage?.attributes?.imageAltText || "",
    },
  }));
};
