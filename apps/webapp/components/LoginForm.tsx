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
import { User } from "database";
import ShowErrors from "./ShowErrors";
import { UserContext } from "./UserContext";

export default function LoginForm() {
  const [registerBody, setRegisterBody] = React.useState<Partial<User>>();

  const [error, setError] = React.useState<AxiosError>();
  const router = useRouter();
  const { setUser } = React.useContext(UserContext);
  return (
    <Box sx={{ width: "300px" }}>
      <Typography mb={5} textAlign="center" variant="h4">
        login
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
              const { data: currentUser } = await apiClient.post(
                "/auth/login",
                registerBody
              );
              debugger;
              setUser?.(currentUser);
              router.push("/products");
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
