import { Alert, AlertTitle, Stack } from "@mui/material";
import { AxiosError } from "axios";
import { getErrorsFromResponse } from "./utils";

export default function ShowErrors({ error }: { error: AxiosError }) {
  const messages = getErrorsFromResponse(error);

  if (!messages || messages?.length === 0) {
    return null;
  }

  return (
    <Stack sx={{ mt: 2, width: "100%" }} spacing={2}>
      {messages.map((message) => {
        return (
          <Alert key={message} severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
          </Alert>
        );
      })}
    </Stack>
  );
}
