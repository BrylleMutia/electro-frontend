import { emphasize, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const StyledTabs = withStyles((theme) => ({
  root: {
    borderBottom: "2px solid #E2E2E1",
  },
}))(Tabs);

export const StyledBreadcrumb = withStyles((theme) => ({
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

export const RatingProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: "15em",
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

export const RemoveButton = withStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
  },
}))(Button);

export const CartButton = withStyles((theme) => ({
  root: {
    borderRadius: "20px",
    textTransform: "none",
  },
}))(Button);

export const RoundedInput = withStyles((theme) => ({
  root: {
    borderRadius: "100px",
  }
}))(TextField);
