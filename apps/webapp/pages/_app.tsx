import { Container } from "@mui/material";
import { User } from "database";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import ResponsiveAppBar from "../components/Navigation";
import { UserContext } from "../components/UserContext";
import { Global, css } from "@emotion/react";

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
        `}
      />
      <ResponsiveAppBar />
      <Container sx={{ mt: 5 }}>
        <Component {...pageProps} />
      </Container>
    </UserContext.Provider>
  );
}
