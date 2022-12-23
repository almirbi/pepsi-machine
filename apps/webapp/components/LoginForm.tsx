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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useRouter } from "next/router";

enum ROLE {
  BUYER = "BUYER",
  SELLER = "SELLER",
}

export default function Login() {
  const [registerBody, setRegisterBody] = React.useState<
    Partial<{
      username: string;
      password: string;
      role: ROLE;
    }>
  >();

  const [error, setError] = React.useState<string[]>();
  const router = useRouter();

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
        </FormControl>
        <Button
          onClick={async () => {
            try {
              const newUser = await apiClient.post(
                "/auth/register",
                registerBody
              );
              router.push("/login");
            } catch (e) {
              setError(
                (e as AxiosError<{ message: string[] }>).response?.data?.message
              );
            }
          }}
          variant="outlined"
        >
          Submit
        </Button>
      </Stack>
      {error && (
        <Stack sx={{ mt: 2, width: "100%" }} spacing={2}>
          {error.map((message) => {
            return (
              <Alert key={message} severity="error">
                <AlertTitle>Error</AlertTitle>
                {message}
              </Alert>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
