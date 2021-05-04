import React from "react";
import styles from "./Category.module.scss";
import type { ProductInterface } from "../../../redux/types";
import { Product } from "../../Featured";

interface Props {
  categoryProducts: ProductInterface[];
}

const Category: React.FC<Props> = ({ categoryProducts }) => {
  return (
    <div className={styles.category_grid}>
      {categoryProducts.map((product, index) => (
        <div className={styles.grid_item}>
          <Product productDetails={product} index={index} />
        </div>
      ))}
    </div>
  );
};

export default Category;
