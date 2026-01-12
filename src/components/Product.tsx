import StarRating from "./StarRating";
import { ProductImage, ProductPrice, ProductBrand } from "../types";

interface ProductProps {
  productName: string;
  image: ProductImage;
  price: ProductPrice;
  averageRating?: number;
  brand: ProductBrand;
}

function Product({
  productName,
  image,
  price,
  averageRating,
  brand,
}: ProductProps) {
  console.log("averageRating", averageRating);
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 mb-4 relative">
        <img
          src={image.url}
          alt={image.altText}
          className="h-full w-full object-contain"
        />
        <div className="absolute top-2 right-2 bg-white rounded p-1 shadow-sm">
          <img
            src={brand.brandImageUrl}
            alt={brand.brandImageAltText}
            className="h-6 w-auto object-contain"
          />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{productName}</h3>

        {/* Star Rating */}
        {averageRating && <StarRating rating={averageRating} />}

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="font-bold text-xl">£{price.currentPrice}</p>
          {price.wasPrice > 0 && (
            <p className="text-gray-500 line-through text-sm">
              £{price.wasPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
