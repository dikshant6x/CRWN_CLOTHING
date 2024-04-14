import { createContext, useState } from "react"; // very imp
import PRODUCTS from "../../shop-data.json"; // getting products from data file

export const ProductsContext = createContext({
  products: [],
});
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
