import * as React from "react";
import Box from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

enum ROLE {
  BUYER = "BUYER",
  SELLER = "SELLER",
}

export default function Register() {
  const [registerBody, setRegisterBody] = React.useState<
    Partial<{
      username: string;
      password: string;
      role: ROLE;
    }>
  >();
  return (
    <Box sx={{ width: "300px" }}>
      <Typography textAlign="center" variant="h4">
        Register
      </Typography>
      ;
      <Stack gap={4}>
        <TextField
          label="username"
          onChange={(event) => {
            setRegisterBody((current) => ({
              ...current,
              username: event.target.value,
            }));
          }}
        />
        <TextField
          label="password"
          onChange={(event) => {
            setRegisterBody((current) => ({
              ...current,
              password: event.target.value,
            }));
          }}
          type="password"
        />
        <InputLabel id="role">Age</InputLabel>
        <Select
          labelId="role"
          label="Age"
          onChange={(event: SelectChangeEvent) => {
            setRegisterBody((current) => ({
              ...current,
              role: event.target.value as ROLE,
            }));
          }}
        >
          <MenuItem value="BUYER">Buyer</MenuItem>
          <MenuItem value="SELLER">Seller</MenuItem>
        </Select>

        <Button onClick={() => {}} variant="outlined">
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
