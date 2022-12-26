import * as React from "react";
import Box from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { apiClient } from "./api";
import FormControl from "@mui/material/FormControl";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ROLE } from "../constants";
import ShowErrors from "./ShowErrors";

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
