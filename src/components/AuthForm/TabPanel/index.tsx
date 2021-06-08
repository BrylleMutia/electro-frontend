import React from "react";
import { Box } from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  padding?: number,
  index: any;
  value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({ index, value, padding = 3, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box p={padding}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
