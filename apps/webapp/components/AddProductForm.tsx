import * as React from "react";
import Box from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import { apiClient } from "./api";
import FormControl from "@mui/material/FormControl";
import { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { Product } from "database";
import { NumberFormatCustom } from "./NumberFormatCustom";

type Props = {
  onAdd: () => {};
};

export default function AddProductForm({ onAdd }: Props) {
  const [newProduct, setNewProduct] = React.useState<Partial<Product>>();

  const [error, setError] = React.useState<string[]>();

  return (
    <Box sx={{ width: "300px" }}>
      <Typography textAlign="center" variant="h4">
        Add Product
      </Typography>

      <Stack gap={4}>
        <TextField
          label="Cost"
          value={newProduct?.cost ? newProduct?.cost / 100 : undefined}
          onChange={(e) => {
            setNewProduct((current) => ({
              ...current,
              cost: parseFloat(e.target.value) * 100,
            }));
          }}
          InputProps={{
            inputComponent: NumberFormatCustom as any,
          }}
          variant="outlined"
        />
        <FormControl>
          <TextField
            label="amount available"
            value={newProduct?.amountAvailable}
            onChange={(event) => {
              setNewProduct((current) => ({
                ...current,
                amountAvailable: parseInt(event.target.value),
              }));
            }}
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="product name"
            onChange={(event) => {
              setNewProduct((current) => ({
                ...current,
                productName: event.target.value,
              }));
            }}
            type="text"
          />
        </FormControl>

        <Button
          onClick={async () => {
            try {
              await apiClient.post("/products", newProduct);
              onAdd();
            } catch (e) {
              const errorMessages = (e as AxiosError<{ message: string[] }>)
                .response?.data?.message;
              Array.isArray(errorMessages) && setError(errorMessages);
            }
          }}
          variant="outlined"
        >
          Submit
        </Button>
      </Stack>
      {error && (
        <Stack sx={{ mt: 2, width: "100%" }} spacing={2}>
          {error.map((message) => {
            return (
              <Alert key={message} severity="error">
                <AlertTitle>Error</AlertTitle>
                {message}
              </Alert>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
