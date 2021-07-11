import React from 'react'

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

interface Props {
  loadingText: string;
  isLoading: boolean;
  color?: "primary" | "secondary";
}

const LoadingBackdrop: React.FC<Props> = ({ isLoading, loadingText, color = "primary" }) => {
  return (
    <Backdrop open={isLoading} style={{ zIndex: 99 }}>
        <CircularProgress color={color} />
        <Typography variant="h6" style={{ marginLeft: "1em" }} color={color}>{loadingText}</Typography>
      </Backdrop>
  )
}

export default LoadingBackdrop;
