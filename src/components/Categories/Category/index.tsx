import React, { useState, useEffect } from "react";
import styles from "./Category.module.scss";
import type { ProductInterface } from "../../../redux/types";
import { Product } from "../../Featured";
import Pagination from "@material-ui/lab/Pagination";
import paginate from "../../../utils/pagination";
import cx from "classnames";

interface Props {
  categoryProducts: ProductInterface[];
}

type CategoryPage = ProductInterface[];

const Category: React.FC<Props> = ({ categoryProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<CategoryPage[]>([[]]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // group products into pages
    // 10 products per page
    const PRODUCT_PER_PAGE = 10;

    let newProducts: CategoryPage[] = [];
    let groupsNum = Math.floor(categoryProducts.length / PRODUCT_PER_PAGE) + 1;

    for (let i = 1; i <= groupsNum; i++) {
      newProducts.push(paginate(categoryProducts, i, PRODUCT_PER_PAGE));
    }

    setPaginatedProducts(newProducts);
  }, []);

  return (
    <div className={styles.flex_column}>
      <div className={styles.category_grid}>
        {paginatedProducts[currentPage - 1].map((product, index) => (
          <div className={styles.grid_item} key={index}>
            <Product productDetails={product} index={index} />
          </div>
        ))}
      </div>
      <Pagination color="primary" count={paginatedProducts.length} page={currentPage} onChange={handlePageChange} />
    </div>
  );
};

export default Category;
