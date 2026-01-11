interface ProductProps {
  productName: string;
  image: {
    url: string;
    altText: string;
  };
  price: {
    wasPrice: number;
    currentPrice: number;
    currency: string;
  };
}

function Product({ productName, image, price }: ProductProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 mb-4">
        <img
          src={image.url}
          alt={image.altText}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{productName}</h3>
        <p>{price.currentPrice}</p>
      </div>
    </div>
  );
}

export default Product;
