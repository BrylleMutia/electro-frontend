import React, { useState } from "react";
import styles from "./SellerProducts.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

import { NewProductCard } from "../AddProductForm";
import { CardsTab } from "../StyledComponents";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

function SellerProducts() {
  const { sellerProducts } = useAppSelector((state) => state.dashboard);
  const [tabView, setTabView] = useState(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  return (
    <section>
      <div className={styles.products_header}>
        <Typography>{sellerProducts.length ? "My Products" : "No products"}</Typography>
        <Button component={Link} startIcon={<AddIcon />} to="/product/new" variant="contained" disableElevation color="primary">
          New Product
        </Button>
      </div>
      <Tabs
        value={tabView}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example">
        {sellerProducts?.map((product, index) => (
          <CardsTab key={index} icon={<NewProductCard newProductDetails={product} cardElevation={1} />} />
        ))}
      </Tabs>
    </section>
  );
}

export default SellerProducts;
