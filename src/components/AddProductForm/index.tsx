import React, { useState, useEffect } from "react";
import styles from "./AddProductForm.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useTheme, Theme } from "@material-ui/core/styles";
import { getAllCategories, addNewCategory } from "../../redux/shop/shopSlice";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PublishIcon from "@material-ui/icons/Publish";
import AddBoxIcon from "@material-ui/icons/AddBox";

interface AddProductInfo {
  product_name: string;
  price: number;
  product_image: File | null;
  description: string;
  categories: string[] | null;
  seller_id: number;
}

function AddProduct() {
  const { userDetails } = useAppSelector((state) => state.auth);
  const { availableCategories } = useAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productPreviewImage, setProductPreviewImage] = useState<string>("");
  const [productCategories, setProductCategories] = useState<string[]>([]);

  const theme = useTheme();

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      // create a temporary preview to be shown to the user
      setProductPreviewImage(URL.createObjectURL(e.target.files[0]));
      setProductImage(e.target.files[0]);
    }
  };

  const handleCategoriesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductCategories(event.target.value as string[]);
  };

  const getStyles = (category: string, categories: string[], theme: Theme) => {
    return {
      fontWeight: categories.indexOf(category) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
  };

  const submitNewCategory = () => {
    dispatch(addNewCategory({ name: newCategory }));
    setIsCategoryDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCategories("_"));
  }, []);

  return (
    <div className={styles.add_product}>
      <div className={styles.img_container}>
        {productImage ? <img className={styles.pic} src={productPreviewImage} alt="new-product" /> : <h4>No image attached.</h4>}
        <Button className={styles.attach_btn} component="label" variant="outlined" size="small" color="secondary" startIcon={<PublishIcon />}>
          Attach image
          <Input hidden={true} type="file" name="image" onChange={handleProductImageChange} />
        </Button>
      </div>

      <form className={styles.product_form}>
        <div className={styles.details}>
          <TextField fullWidth className={styles.first} name="product_name" variant="outlined" label="Product Name" required />
          <TextField
            fullWidth
            name="price"
            type="number"
            variant="outlined"
            label="Price"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">P</InputAdornment>,
            }}
          />
        </div>
        <TextareaAutosize name="description" required rowsMin={5} placeholder="Description" />

        <div className={styles.categories}>
          <FormControl className={styles.form_control} style={{ margin: "1em 0" }}>
            <InputLabel id="demo-mutiple-chip-label">Categories</InputLabel>
            <Select
              className={styles.select}
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={productCategories}
              onChange={handleCategoriesChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={styles.chips}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} className={styles.chip} />
                  ))}
                </div>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: 250,
                  },
                },
              }}>
              {availableCategories.map((category, index) => (
                <MenuItem key={index} value={category.name} style={getStyles(category.name, productCategories, theme)}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton color="primary" onClick={() => setIsCategoryDialogOpen(true)}>
            <AddBoxIcon />
          </IconButton>
        </div>

        <Button type="submit" className={styles.submit_button} endIcon={<PostAddIcon />} color="primary" variant="contained" disableElevation>
          Add new product
        </Button>
      </form>

      <Dialog open={isCategoryDialogOpen} onClose={() => setIsCategoryDialogOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <TextField autoFocus value={newCategory} onChange={(e) => setNewCategory(e.target.value)} margin="dense" id="new-category" label="New Category" fullWidth color="secondary" />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitNewCategory} size="small" color="secondary" disableElevation>
            Add category
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddProduct;
