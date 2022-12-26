import { useEffect, useState } from "react";
import { apiClient } from "./api";
import { Product } from "database";
import { AxiosError } from "axios";
import ShowErrors from "./ShowErrors";
import AddProductForm from "./AddProductForm";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
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
  }, []);

  return (
    <div>
      <ShowErrors error={error as AxiosError} />
      <AddProductForm
        onAdd={async () => {
          setProducts((await apiClient.get("/products")).data);
        }}
      />
      {products?.map((product) => (
        <div>{product.productName}</div>
      ))}
    </div>
  );
}
