import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

import { StyledBreadcrumb } from "../StyledComponents"
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";



function ProductNav() {
  let { currentProduct } = useAppSelector((state) => state.shop);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">
          <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} />
        </Link>
        <Link to="/">
          <StyledBreadcrumb label={currentProduct?.categories[0].name} />
        </Link>
        <StyledBreadcrumb label={currentProduct?.product_name} deleteIcon={<ExpandMoreIcon />} onClick={handleClick} onDelete={handleClick} />
      </Breadcrumbs>

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default ProductNav;
