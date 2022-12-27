import { Button, InputLabel, MenuItem } from "@mui/material";
import { Box } from "@mui/material";
import { FormControl } from "@mui/material";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Select, SelectChangeEvent } from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import * as React from "react";

import { ROLE } from "../constants";
import { apiClient } from "./api";
import ShowErrors from "./ShowErrors";
import { UserContext } from "./UserContext";

export default function Register() {
  const [registerBody, setRegisterBody] = React.useState<
    Partial<{
      username: string;
      password: string;
      role: ROLE;
    }>
  >();

  const [error, setError] = React.useState<AxiosError>();
  const router = useRouter();
  const { user } = React.useContext(UserContext);

  if (user) {
    return null;
  }

  return (
    <Box sx={{ width: "300px" }}>
      <Typography mb={5} textAlign="center" variant="h4">
        register
      </Typography>
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
        <FormControl>
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
        </FormControl>
        <FormControl>
          <InputLabel sx={{ mb: 1 }} id="role">
            role
          </InputLabel>
          <Select
            labelId="role"
            label="role"
            value={registerBody?.role || ""}
            onChange={(event: SelectChangeEvent) => {
              setRegisterBody((current) => ({
                ...current,
                role: event.target.value as ROLE,
              }));
            }}
          >
            <MenuItem value={ROLE.BUYER}>buyer</MenuItem>
            <MenuItem value={ROLE.SELLER}>seller</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={async () => {
            try {
              await apiClient.post("/auth/register", registerBody);
              router.push("/login");
            } catch (e) {
              setError(e as AxiosError);
            }
          }}
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          submit
        </Button>
      </Stack>
      <ShowErrors error={error as AxiosError} />
    </Box>
  );
}
