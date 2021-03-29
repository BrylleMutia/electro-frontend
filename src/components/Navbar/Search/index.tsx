import React from "react";
import styles from "./Search.module.scss";

import { StylesProvider, TextField } from "@material-ui/core";

function Search(): JSX.Element {
  return (
    <>
      <TextField className={styles.search} id="outlined-basic" placeholder="Search" variant="outlined" />
    </>
  );
}

export default Search;
