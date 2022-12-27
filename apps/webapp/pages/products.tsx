import { Box, Dialog, DialogTitle, Grid, Typography } from "@mui/material";
import { Product } from "database";
import Head from "next/head";
import { useContext, useState } from "react";

import AddProductForm from "../components/AddProductForm";
import { apiClient } from "../components/api";
import RupeeChange from "../components/DepositForm/RupeeChange";
import ProductList from "../components/ProductList";
import { UserContext } from "../components/UserContext";
import { ROLE } from "../constants";
import { BuyResult } from "../types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [buyResult, setBuyResult] = useState<BuyResult>();
  const { user } = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid justifyContent="center" spacing={2} width="100%">
          {user?.role === ROLE.SELLER && (
            <Grid padding={0} md={4} justifyContent="center" sm={12}>
              <AddProductForm
                onAdd={async () => {
                  setProducts((await apiClient.get("/products")).data);
                }}
              />
            </Grid>
          )}
          <Grid width="100%" md={8} sm={12}>
            <ProductList
              onBuy={async (buyResult: BuyResult) => {
                setBuyResult(buyResult);
                setShowResult(true);
                setProducts((await apiClient.get("/products")).data);
              }}
              products={products}
              setProducts={setProducts}
            />
          </Grid>
        </Grid>
        <Dialog open={showResult} onClose={() => setShowResult(false)}>
          <DialogTitle>
            you bought {buyResult?.product.productName}!
          </DialogTitle>

          {buyResult && (
            <Box p={3}>
              <RupeeChange change={buyResult.change} />
              <Typography mt={4}>
                total spent: {buyResult.totalSpent / 100}
              </Typography>
            </Box>
          )}
        </Dialog>
      </main>
    </>
  );
}
