import React from "react";
import { emphasize, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

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
