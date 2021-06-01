import React from "react";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

import { Category } from "../components/Categories";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { StyledBreadcrumb } from "../components/StyledComponents";
import HomeIcon from "@material-ui/icons/Home";
import { CircularProgress } from "@material-ui/core";

function Search() {
  const { isLoading, searchResults } = useAppSelector((state) => state.shop);
  const { userType } = useAppSelector((state) => state.auth);

  return (
    <div className={styles.container}>
      <div className={styles.checkout_nav}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to={userType === "seller" ? "/seller/dashboard" : "/"}>
            <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} />
          </Link>
          <StyledBreadcrumb label="Search" />
        </Breadcrumbs>
      </div>

      <div className={styles.search}>
        {isLoading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <h4>{searchResults.length ? "Search results:" : "No products found."} </h4>
            <Category isLoading={isLoading} categoryProducts={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
