import RupeeIcon from "./RupeeIcon";
import { DEPOSIT_SIZES } from "../../constants";
import { Stack } from "@mui/material";

type Props = {
  change: number[];
};

export default function RupeeChange({ change }: Props) {
  return (
    <Stack
      direction="row"
      width="100%"
      maxWidth="400px"
      justifyContent="space-between"
      gap={3}
    >
      {change.map((value, index) => {
        return <RupeeIcon size={DEPOSIT_SIZES[index]} count={value} />;
      })}
    </Stack>
  );
}
