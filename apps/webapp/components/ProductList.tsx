import { useEffect, useState } from "react";
import { apiClient } from "./api";
import { Product } from "database";
import { AxiosError } from "axios";
import ShowErrors from "./ShowErrors";
import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { BuyResult } from "../types";

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
        {products?.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              sx={{ width: { md: "300px", xs: "80px" } }}
              primary={product.productName}
              secondary={
                <>
                  <ListItemText>{`R ${product.cost / 100}`}</ListItemText>
                  <ListItemText>
                    Stock: x {product.amountAvailable}
                  </ListItemText>
                </>
              }
            />

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
              variant="outlined"
            >
              Buy
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
