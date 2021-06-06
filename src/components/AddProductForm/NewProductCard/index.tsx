import React from "react";
import styles from "./NewProductCard.module.scss";
import type { ProductInterface } from "../../../redux/shop/types";
import { useAppSelector } from "../../../redux/hooks";
import { numWithCommas } from "../../../utils/filters";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Chip from "@material-ui/core/Chip";

interface Props {
  newProductDetails: ProductInterface | null;
  withActions?: boolean;
  cardElevation?: number;
}

const NewProductCard: React.FC<Props> = ({ newProductDetails, withActions = false, cardElevation = 3 }) => {
  const { isLoading } = useAppSelector((state) => state.shop);

  return (
    <Card elevation={cardElevation} className={styles.card}>
      <CardHeader title="New product added!" titleTypographyProps={{ variant: "subtitle1", color: "primary" }} />
      {isLoading ? (
        <Skeleton>
          <CardMedia className={styles.product_img} component="img" alt={newProductDetails?.product_name} src={newProductDetails?.product_image} title={newProductDetails?.product_name} />
        </Skeleton>
      ) : (
        <CardMedia className={styles.product_img} component="img" alt={newProductDetails?.product_name} src={newProductDetails?.product_image} title={newProductDetails?.product_name} />
      )}
      <CardContent>
        {isLoading ? (
          <Skeleton>
            <Typography variant="h6" component="h2">
              {newProductDetails?.product_name}
            </Typography>
          </Skeleton>
        ) : (
          <Typography variant="h6" component="h5">
            {newProductDetails?.product_name}
          </Typography>
        )}

        {isLoading ? (
          <Skeleton>
            <Typography gutterBottom variant="h6" component="h6">
              {newProductDetails?.price}
            </Typography>
          </Skeleton>
        ) : (
          <Typography gutterBottom variant="subtitle1" component="p">
            P {numWithCommas(Number(newProductDetails?.price ?? 0))}
          </Typography>
        )}

        <div className={styles.categories_container}>
          {newProductDetails?.categories.map((category, index) =>
            isLoading ? (
              <Skeleton>
                <Chip size="small" key={index} label={category.name} />
              </Skeleton>
            ) : (
              <Chip size="small" key={index} label={category.name} />
            )
          )}
        </div>

        {isLoading ? (
          <Skeleton>
            <Typography variant="body2" color="textSecondary" component="p">
              {newProductDetails?.description}
            </Typography>
          </Skeleton>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {newProductDetails?.description}
          </Typography>
        )}
      </CardContent>

      {withActions && (
        <CardActions>
          <Button size="small" color="primary">
            Okay
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default NewProductCard;
