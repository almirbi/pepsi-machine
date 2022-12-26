import Image from "next/image";
import blue5 from "./5-blue.png";
import yellow10 from "./10-yellow.png";
import red20 from "./20-red.png";
import purple50 from "./50-purple.png";
import silver100 from "./100-silver.png";
import disabledRupee from "./disabled.png";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { IconButton } from "@mui/material";
import { Rupee } from "../../types";

const rupees = {
  "5": blue5,
  "10": yellow10,
  "20": red20,
  "50": purple50,
  "100": silver100,
};

type Props = {
  size: Rupee;
  onClick: () => void;
  disabled?: boolean;
};

export default function RupeeButton({ size, onClick, disabled }: Props) {
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
    <IconButton disabled={disabled} size="large" onClick={onClick}>
      <Image
        width={50}
        src={
          disabled
            ? disabledRupee
            : rupees[size.toString() as keyof typeof rupees]
        }
        alt={`ruppe ${size}`}
      />
    </IconButton>
  );
}
