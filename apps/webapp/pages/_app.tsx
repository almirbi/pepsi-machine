import { Container } from "@mui/material";
import { User } from "database";
import type { AppProps } from "next/app";
import { createContext, useMemo, useState } from "react";
import ResponsiveAppBar from "../components/Navigation";

type ContextType = {
  user?: User;
  setUser?: (_val?: User) => void;
};

export const UserContext = createContext<ContextType>({
  user: undefined,
  setUser: undefined,
});

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
