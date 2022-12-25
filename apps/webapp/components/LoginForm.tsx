import * as React from "react";
import Box from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import { apiClient } from "./api";
import FormControl from "@mui/material/FormControl";
import { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
// import { useRouter } from "next/router";
import { ROLE } from "../constants";

export default function Login() {
  const [registerBody, setRegisterBody] = React.useState<
    Partial<{
      username: string;
      password: string;
      role: ROLE;
    }>
  >();

  const [error, setError] = React.useState<string[]>();
  //  const router = useRouter();

  return (
    <Box sx={{ width: "300px" }}>
      <Typography textAlign="center" variant="h4">
        Login
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
        <Button
          onClick={async () => {
            try {
              await apiClient.post("/auth/login", registerBody);
              // router.push("/products");
            } catch (e) {
              const errorMessages = (e as AxiosError<{ message: string[] }>)
                .response?.data?.message;
              Array.isArray(errorMessages) && setError(errorMessages);
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
