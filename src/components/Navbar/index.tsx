import React, { useState } from "react";
import styles from "./Navbar.module.scss";

import Search from "./Search";

import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

function Navbar(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <nav className={styles.nav}>
      <h3 className={styles.logo}>
        Electro<span>.</span>
      </h3>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu}>
        <MenuIcon />
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={closeMenu}>My account</MenuItem>
        <MenuItem onClick={closeMenu}>Logout</MenuItem>
      </Menu>
      <Search />
    </nav>
  );
}

export default Navbar;
export { Search };
