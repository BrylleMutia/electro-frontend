import React, { useState } from "react";
import styles from "./AddProductForm.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { useTheme, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import InputAdornment from "@material-ui/core/InputAdornment";
import PostAddIcon from '@material-ui/icons/PostAdd';
import PublishIcon from "@material-ui/icons/Publish";

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
  const { categories } = useAppSelector((state) => state.shop);

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

  function getStyles(category: string, categories: string[], theme: Theme) {
    return {
      fontWeight: categories.indexOf(category) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
  }

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
          <TextField className={styles.first} name="product_name" variant="outlined" label="Product Name" required />
          <TextField
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
        <TextareaAutosize name="description" required rowsMin={3} placeholder="Description" />
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
            {Object.keys(categories).map((category, index) => (
              <MenuItem key={index} value={category} style={getStyles(category, productCategories, theme)}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" className={styles.submit_button} endIcon={<PostAddIcon />} color="primary" variant="contained" disableElevation>Add new product</Button>
      </form>
    </div>
  );
}

export default AddProduct;
