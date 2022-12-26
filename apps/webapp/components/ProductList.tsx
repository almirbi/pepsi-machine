import { useEffect, useState } from "react";
import { apiClient } from "./api";
import { Product } from "database";
import { AxiosError } from "axios";
import ShowErrors from "./ShowErrors";
import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";

type Props = {
  products: Product[];
  // eslint-disable-next-line no-unused-vars
  setProducts: (data: Product[]) => void;
};

export default function ProductList({ products, setProducts }: Props) {
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
          maxHeight: "calc(100vh - 200px)",
          overflow: "scroll",
          bgcolor: "background",
        }}
      >
        {products?.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.productName}
              secondary={`R ${product.cost / 100}`}
            />
            <ListItemText>x {product.amountAvailable}</ListItemText>

            <TextField
              sx={{ mr: 2, width: 150 }}
              defaultValue={amount}
              label="amount"
              onChange={(event) => {
                setAmount(parseInt(event.target.value));
              }}
              type="number"
              InputProps={{
                inputProps: { min: 1, max: product.amountAvailable },
              }}
            />
            <Button
              onClick={async () => {
                try {
                  const { data: bought } = await apiClient.post("/buy", {
                    productId: product.id,
                    amount: amount,
                  });
                  console.log(bought);
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
