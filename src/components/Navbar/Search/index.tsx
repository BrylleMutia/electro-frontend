import React, { useState } from "react";
import styles from "./Search.module.scss";
import { searchProducts } from "../../../redux/shop/shopSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { useHistory } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

interface Props {
  style?: Object;
}

const Search: React.FC<Props> = ({ style }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!searchQuery) return;
    
    dispatch(searchProducts(searchQuery));
    // redirect to search page
    history.push("/search");
  };

  return (
    <form className={styles.search} onSubmit={handleSearch}>
      <input className={styles.search_input} type="text" placeholder="Search for products" onChange={handleInputChange} />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default Search;
