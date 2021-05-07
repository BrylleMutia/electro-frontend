import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import Search from "./Search";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { IconButton, Button, List, ListItemIcon, Drawer, ListItemText, Icon, ListItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAppSelector } from "../../redux/hooks";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InputIcon from "@material-ui/icons/Input";
import HelpIcon from "@material-ui/icons/Help";

function Navbar(): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const getNavIcons = (name: string) => {
    switch (name.toLowerCase()) {
      case "profile":
        return <AccountCircleIcon />;
        break;
      case "register":
      case "login":
        return <InputIcon />;
        break;
      default:
        return <HelpIcon />;
    }
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <nav className={styles.nav}>
      <div>
        <h3 className={styles.logo}>
          Electro<span>.</span>
        </h3>

        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          <div className={styles.drawer} onClick={toggleDrawer}>
            <List>
              {routes.map((route, index) => (
                <ListItem key={index}>
                  <ListItemIcon>{getNavIcons(route.name)}</ListItemIcon>
                  <ListItemText primary={route.name} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </div>

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
