import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  sku: string;
  productName: string;
  slug: string;
  averageRating: number;
  image: {
    url: string;
    altText: string;
  };
  stockStatus: string;
  price: {
    wasPrice: number;
    currentPrice: number;
    currency: string;
  };
  brand: {
    brandName: string;
    brandSlug: string;
    brandImageUrl: string;
    brandImageAltText: string;
  };
}

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetProducts: (state) => {
      state.products = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setProducts, setLoading, setError, resetProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
