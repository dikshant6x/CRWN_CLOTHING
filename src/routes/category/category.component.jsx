import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../components/contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer, Title } from "./category.styles";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]); // we only wan to chaneg products value when category or categoriesMap value chnages

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]); // whenever category and categoriesMap changes we set products with chnages as thsi helps us incase we re render the component so products are not removed.

  // Here we return products we get after all changes above and map our o/p as per

  // here we employ safegaurds to makesure we dont get empty obj as for starters when firts time we use categoriesMap its an empty object and as its getting data async ,but here we are running sync base function so empty obj. to handle this add && condition if products && products.map  ...
  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
