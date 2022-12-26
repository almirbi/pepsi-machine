import { Container } from "@mui/material";
import { User } from "database";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import ResponsiveAppBar from "../components/Navigation";
import { UserContext } from "../components/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  const value = useMemo(() => ({ user, setUser }), [user]);
  return (
    <UserContext.Provider value={value}>
      <ResponsiveAppBar />
      <Container sx={{ mt: 5 }}>
        <Component {...pageProps} />
      </Container>
    </UserContext.Provider>
  );
}
