import Product from "./Product";
import { useAppSelector } from "../hooks/redux";

function ProductsList() {
  const products = useAppSelector((state) => state.products.products);
  const error = useAppSelector((state) => state.search.error);

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No products found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Product
          key={product.id}
          productName={product.productName}
          image={product.image}
        />
      ))}
    </div>
  );
}

export default ProductsList;
