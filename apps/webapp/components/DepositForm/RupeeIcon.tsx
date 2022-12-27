import Image from "next/image";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Rupee } from "../../types";
import { RUPEES_IMAGE_MAP } from "./constants";
import { Badge } from "@mui/material";

type Props = {
  size: Rupee;
  width?: number;
  count?: number;
};

export default function RupeeIcon({ size, width = 20, count }: Props) {
  const [, setError] = useState<AxiosError>();
  useEffect(() => {
    (async () => {
      try {
        setError(undefined);
      } catch (e) {
        setError(e as AxiosError);
      }
    })();
  }, []);

  return (
    <Badge
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      badgeContent={`x${count}`}
      color="primary"
    >
      <Image
        width={width}
        src={RUPEES_IMAGE_MAP[size.toString() as keyof typeof RUPEES_IMAGE_MAP]}
        alt={`ruppe ${size}`}
      />
    </Badge>
  );
}
