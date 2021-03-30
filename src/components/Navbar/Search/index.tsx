import React from "react";
import styles from "./Search.module.scss";

import { TextField, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  style?: Object
}

const Search: React.FC<Props> = ({ style }) => {
  return (
    <div className={styles.search} style={style}>
      <input className={styles.search_input} type="text" placeholder="Search for products"/>
      <IconButton>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default Search;
