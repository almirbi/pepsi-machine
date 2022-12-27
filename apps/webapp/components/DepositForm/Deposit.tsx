import { CurrencyRupee } from "@mui/icons-material";
import { Box, Chip, SxProps, Theme, Typography } from "@mui/material";

type Props = { amount: number; sx?: SxProps<Theme> };

export default function Deposit({ amount, sx }: Props) {
  return (
    <Chip
      variant="outlined"
      color="primary"
      sx={{ ml: 2, width: 100, ...sx }}
      label={
        <Box display="flex" alignItems="center">
          <Typography>{amount}</Typography>
          <CurrencyRupee />
        </Box>
      }
    />
  );
}
