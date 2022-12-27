import { CurrencyRupee } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { Product } from "database";
import { useContext, useEffect, useState } from "react";

import { ROLE } from "../constants";
import { BuyResult } from "../types";
import { apiClient } from "./api";
import ShowErrors from "./ShowErrors";
import { UserContext } from "./UserContext";

type Props = {
  products: Product[];
  setProducts: (_data: Product[]) => void;
  onBuy: (_buyResylt: BuyResult) => void;
};

export default function ProductList({ products, setProducts, onBuy }: Props) {
  const [error, setError] = useState<AxiosError>();
  useEffect(() => {
    (async () => {
      try {
        setProducts((await apiClient.get("/products")).data);
        setError(undefined);
      } catch (e) {
        setError(e as AxiosError);
      }
    })();
  }, [setProducts]);

  const [amount, setAmount] = useState<number>(1);

  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  if (products.length === 0) {
    return <Typography>There are currently no products.</Typography>;
  }

  return (
    <div>
      <ShowErrors error={error as AxiosError} />
      <List
        sx={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "90vh",
          overflow: "scroll",
          bgcolor: "background",
        }}
      >
        {products?.map((product) =>
          product.amountAvailable > 0 ? (
            <ListItem key={product.id}>
              <ListItemText
                sx={{ width: { md: "300px", xs: "80px" } }}
                primary={
                  <>
                    <Typography fontSize={20}>
                      {product.productName}
                      <Typography ml={1} fontSize={15} component="span">
                        ({product.amountAvailable})
                      </Typography>
                    </Typography>
                    <Typography
                      fontSize={25}
                      fontWeight="700"
                      color="secondary"
                      display="flex"
                    >
                      <CurrencyRupee fontSize="large" />
                      {`${product.cost / 100}`}
                    </Typography>
                  </>
                }
                secondary={<span></span>}
              />

              {user?.role === ROLE.BUYER && (
                <>
                  <TextField
                    sx={{ mr: 2, width: { xs: 60, md: 90 } }}
                    defaultValue={amount}
                    label="amount"
                    onChange={(event) => {
                      setAmount(parseInt(event.target.value));
                    }}
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: product.amountAvailable > 0 ? 1 : 0,
                        max: product.amountAvailable,
                      },
                    }}
                  />
                  <Button
                    onClick={async () => {
                      try {
                        const { data: bought } = await apiClient.post("/buy", {
                          productId: product.id,
                          amount: amount,
                        });
                        onBuy(bought);
                      } catch (e) {
                        setError(e as AxiosError);
                      }
                    }}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    buy
                  </Button>
                </>
              )}
            </ListItem>
          ) : null
        )}
      </List>
    </div>
  );
}
