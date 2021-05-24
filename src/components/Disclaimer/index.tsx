import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";

interface Props {
  isOpen: boolean;
  toggleDisclaimer: () => void;
}

const Disclaimer: React.FC<Props> = ({ isOpen, toggleDisclaimer }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={toggleDisclaimer} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="info">
              This is a <strong>Work in progress</strong>, other features are not implemented yet. <br />
              But updates are ongoing, so any feedback would be great!
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDisclaimer} color="primary" autoFocus>
            Understood
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Disclaimer;
