import Image from "next/image";
import disabledRupee from "./disabled.png";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { IconButton } from "@mui/material";
import { Rupee } from "../../types";
import { RUPEES_IMAGE_MAP } from "./constants";

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
        src={disabled ? disabledRupee : RUPEES_IMAGE_MAP[size]}
        alt={`ruppe ${size}`}
      />
    </IconButton>
  );
}
