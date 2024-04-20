import { Link } from "react-router-dom";
import {
  CategoryPreviewContainer,
  CatPreview,
  CategoryTitle,
} from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";
const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
      </h2>
      <CatPreview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CatPreview>
    </CategoryPreviewContainer>
  );
};
export default CategoryPreview;
