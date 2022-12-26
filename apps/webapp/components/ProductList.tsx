import { useEffect, useState } from "react";
import { apiClient } from "./api";
import { Product } from "database";
import { AxiosError } from "axios";
import ShowErrors from "./ShowErrors";
import { List, ListItem, ListItemText } from "@mui/material";

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
              secondary={`$ ${product.cost / 100}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
