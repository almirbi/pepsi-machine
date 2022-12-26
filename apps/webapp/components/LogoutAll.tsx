import * as React from "react";
import Box from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { apiClient } from "./api";
import FormControl from "@mui/material/FormControl";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import ShowErrors from "./ShowErrors";

export default function LogoutAll() {
  const [registerBody, setRegisterBody] = React.useState<
    Partial<{
      username: string;
      password: string;
    }>
  >();

  const [error, setError] = React.useState<AxiosError>();
  const router = useRouter();

  return (
    <Box sx={{ width: "300px" }}>
      <Typography mb={5} textAlign="center" variant="h4">
        Logout All
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
        <Button
          onClick={async () => {
            try {
              await apiClient.post("/auth/logout/all", registerBody);
              router.push("/login");
            } catch (e) {
              setError(e as AxiosError);
            }
          }}
          variant="outlined"
        >
          LOGOUT
        </Button>
      </Stack>
      <ShowErrors error={error as AxiosError} />
    </Box>
  );
}
