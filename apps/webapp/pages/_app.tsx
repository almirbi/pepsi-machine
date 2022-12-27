import { css, Global } from "@emotion/react";
import { Container } from "@mui/material";
import { User } from "database";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";

import ResponsiveAppBar from "../src/components/Navigation";
import { UserContext } from "../src/components/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  const value = useMemo(() => ({ user, setUser }), [user]);
  return (
    <UserContext.Provider value={value}>
      <Global
        styles={css`
          body {
            margin: 0;
          }

          button {
            text-transform: none;
          }
        `}
      />
      <ResponsiveAppBar />
      <Container sx={{ mt: 5, justifyContent: "center" }}>
        <Component {...pageProps} />
      </Container>
    </UserContext.Provider>
  );
}
