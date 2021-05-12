import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../redux/shop/shopSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import Navbar from "../components/Navbar";
import styles from "./Pages.module.scss";

import { emphasize, withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface RouteParams {
  id: string;
}

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

function Product() {
  let { id } = useParams<RouteParams>();
  let { currentProduct, isLoading } = useAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    console.log("Breadcrumb clicked!");
  };

  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <div className={styles.container}>
        <Navbar />
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} onClick={handleClick} />
          <StyledBreadcrumb label="Catalog" onClick={handleClick} />
          <StyledBreadcrumb label="Accessories" deleteIcon={<ExpandMoreIcon />} onClick={handleClick} onDelete={handleClick} />
        </Breadcrumbs>
        <div>{currentProduct?.product_name}</div>
      </div>
    );
  }
}

export default Product;
