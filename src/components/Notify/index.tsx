import React from "react";
import { showNotif } from "../../redux/control/controlSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


const Notify = () => {
  const dispatch = useAppDispatch();
  const { isAlertShown, alertVariant, alertMsg } = useAppSelector((state) => state.control.alert);

  // close then reset alert settings
  const handleCloseAlert = () => {
    dispatch(
      showNotif({
        alertMsg: "",
        alertVariant: "success",
        isAlertShown: false,
      })
    );
  };

  return (
    <React.Fragment>
      <Snackbar open={isAlertShown} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert elevation={6} variant="filled" onClose={handleCloseAlert} severity={alertVariant}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Notify;
