import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { IconButton, Button, List, ListItemIcon, Drawer, ListItemText, Icon, ListItem } from "@material-ui/core";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toggleCartDrawer } from "../../redux/cart/cartSlice";
import { numWithCommas } from "../../utils/filters"

import Search from "./Search";
import Logo from "./Logo";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InputIcon from "@material-ui/icons/Input";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import HelpIcon from "@material-ui/icons/Help";
import { CartButton } from "../../components/StyledComponents";

function Navbar(): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { total } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();


  const toggleMenuDrawer = () => setIsDrawerOpen((prev) => !prev);

  const handleCartDrawerToggle = () => dispatch(toggleCartDrawer());

  const getNavIcons = (name: string) => {
    switch (name.toLowerCase()) {
      case "profile":
        return <AccountCircleIcon />;
      case "register":
      case "login":
        return <InputIcon />;
      default:
        return <HelpIcon />;
    }
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <nav className={styles.nav}>
      <div>
        <div className={styles.logo_container}>

        <Logo />
        </div>

        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={toggleMenuDrawer}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleMenuDrawer}>
          <div className={styles.drawer} onClick={toggleMenuDrawer}>
            <List>
              {routes.map((route, index) => {
                if (route.path === "/auth" && isAuthenticated) return;

                return (
                  <Link to={route.path} key={index}>
                    <ListItem key={index}>
                      <ListItemIcon>{getNavIcons(route.name)}</ListItemIcon>
                      <ListItemText primary={route.name} />
                    </ListItem>
                  </Link>
                );
              })}

              {isAuthenticated && (
                <Link to="#">
                  <ListItem>
                    <ListItemIcon>
                      <InputIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </Link>
              )}
            </List>
          </div>
        </Drawer>
      </div>

      <div className={styles.search_wrapper}>
        <Search />
      </div>

      {matches ? (
        <IconButton onClick={handleCartDrawerToggle}>
          <ShoppingCartIcon />
        </IconButton>
      ) : (
        <CartButton startIcon={<ShoppingCartIcon />} variant="contained" color="primary" disableElevation={true} onClick={handleCartDrawerToggle}>
          {total ? `P ${numWithCommas(total)}` : "My Cart"}
        </CartButton>
      )}
    </nav>
  );
}

export default Navbar;
export { Search };
