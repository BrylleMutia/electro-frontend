import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import Search from "./Search";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { IconButton, Button, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAppSelector } from "../../redux/hooks";

function Navbar(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <nav className={styles.nav}>
      <div>
        <h3 className={styles.logo}>
          Electro<span>.</span>
        </h3>

        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu}>
          <MenuIcon />
        </IconButton>
      </div>

      <Menu
        className={styles.menu}
        id="simple-menu"
        variant="selectedMenu"
        elevation={0}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}>
        {routes.map((route, index) => {
          // only render auth routes if user is not authenticated
          if (route.path === "/auth" && isAuthenticated) return;

          return (
            <MenuItem onClick={closeMenu} key={index}>
              <Link to={route.path}>{route.title}</Link>
            </MenuItem>
          );
        })}
      </Menu>

      <div className={styles.search_wrapper}>
        <Search />
      </div>

      {matches ? (
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
      ) : (
        <Button startIcon={<ShoppingCartIcon />} variant="contained" color="primary" disableElevation={true}>
          {"P 1,300.00"}
        </Button>
      )}
    </nav>
  );
}

export default Navbar;
export { Search };
