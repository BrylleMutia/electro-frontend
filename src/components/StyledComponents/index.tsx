import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles"

export const StyledTabs = withStyles((theme) => ({
  root: {
    borderBottom: "2px solid #E2E2E1",
  },
}))(Tabs);