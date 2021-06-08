import React from "react";
import styles from "./Pages.module.scss";
import { useAppSelector } from "../redux/hooks";

import { Category } from "../components/Categories";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { StyledBreadcrumb } from "../components/StyledComponents";
import HomeIcon from "@material-ui/icons/Home";
import { CircularProgress } from "@material-ui/core";
import HomeLink from "../components/HomeLink";


function Search() {
  const { isLoading, searchResults } = useAppSelector((state) => state.shop);

  return (
    <div className={styles.container}>
      <div className={styles.checkout_nav}>
        <Breadcrumbs aria-label="breadcrumb">
          <HomeLink>
            <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} />
          </HomeLink>
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
