import React, { useState } from "react";
import { addNewCategory } from "../../../redux/shop/shopSlice";
import { useAppDispatch } from "../../../redux/hooks";


import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


interface Props {
  isCategoryDialogOpen: boolean;
  closeNewCategoryDialog: () => void;
}

const NewCategoryDialog: React.FC<Props> = ({ isCategoryDialogOpen, closeNewCategoryDialog }) => {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useAppDispatch();


  const submitNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addNewCategory({ name: newCategory }));
    closeNewCategoryDialog();
  };

  return (
    <Dialog open={isCategoryDialogOpen} onClose={closeNewCategoryDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <form onSubmit={submitNewCategory}>
        <DialogContent>
          <TextField autoFocus value={newCategory} onChange={(e) => setNewCategory(e.target.value)} margin="dense" id="new-category" label="New Category" fullWidth color="secondary" />
        </DialogContent>
        <DialogActions>
          <Button type="submit" size="small" color="secondary" disableElevation>
            Add category
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewCategoryDialog;
