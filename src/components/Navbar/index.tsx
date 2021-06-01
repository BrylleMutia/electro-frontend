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
import { showNotif } from "redux/control/controlSlice";

interface Props {
  buttonLabel: string;
  disabledPages?: string[];
}

const Navbar: React.FC<Props> = ({ buttonLabel, disabledPages }) => {
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
        dispatch(showNotif({ alertMsg: "Logged out!", alertVariant: "info" }));
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

          <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={toggleMenuDrawer}>
            <div className={styles.logo_container_mobile}>
              <Logo />
            </div>

            <div className={styles.drawer} onClick={toggleMenuDrawer}>
              <List>
                <ListItem component={Link} to={userType === "seller" ? "/seller/dashboard" : "/"}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>

                {routes.map((route, index) => {
                  if (!route.isProtected && isAuthenticated) return;
                  if (route.isProtected && !isAuthenticated) return;

                  return (
                    <ListItem key={index} component={Link} to={route.path}>
                      <ListItemIcon>{getNavIcons(route.name)}</ListItemIcon>
                      <ListItemText primary={route.name} />
                    </ListItem>
                  );
                })}

                {isAuthenticated && (
                  <ListItem onClick={handleLogout} component={Link} to="#">
                    <ListItemIcon>
                      <InputIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
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
            {!total ? buttonLabel : <CountUp start={total - total / 4} end={total} duration={0.5} formattingFn={(value) => `P ${numWithCommas(value)}`} />}
          </CartButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
export { Search };
