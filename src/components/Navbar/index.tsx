import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link, useLocation, useHistory } from "react-router-dom";
import routes from "../../routes";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { IconButton, List, ListItemIcon, Drawer, ListItemText, ListItem } from "@material-ui/core";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toggleCartDrawer } from "../../redux/cart/cartSlice";
import { logout } from "../../redux/auth/authSlice";
import { numWithCommas } from "../../utils/filters";

import CountUp from "react-countup";
import Search from "./Search";
import Logo from "./Logo";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InputIcon from "@material-ui/icons/Input";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import HelpIcon from "@material-ui/icons/Help";
import HomeIcon from "@material-ui/icons/Home";
import { CartButton } from "../../components/StyledComponents";

interface Props {
  disabledPages?: string[];
}

const Navbar: React.FC<Props> = ({ disabledPages }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated, userType } = useAppSelector((state) => state.auth);
  const { total } = useAppSelector((state) => state.cart);

  const location = useLocation();
  const history = useHistory();
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

  const handleLogout = () => {
    if (userType) {
      dispatch(logout(userType)).then(() => {
        history.push("/");
      });
    }
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <nav className={styles.nav_container}>
      <div className={styles.nav}>
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
                <Link to="/">
                  <ListItem>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>

                {routes.map((route, index) => {
                  if (!route.isProtected && isAuthenticated) return;
                  if (route.isProtected && !isAuthenticated) return;

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
                  <Link onClick={handleLogout} to="#">
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
          <IconButton disabled={disabledPages?.includes(location.pathname)} onClick={handleCartDrawerToggle}>
            <ShoppingCartIcon />
          </IconButton>
        ) : (
          <CartButton disabled={disabledPages?.includes(location.pathname)} startIcon={<ShoppingCartIcon />} variant="contained" color="primary" disableElevation={true} onClick={handleCartDrawerToggle}>
            {!total ? "My Cart" : <CountUp start={total - total / 4} end={total} duration={0.5} formattingFn={(value) => `P ${numWithCommas(value)}`} />}
          </CartButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
export { Search };
