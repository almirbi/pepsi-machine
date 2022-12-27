import { css, Global } from "@emotion/react";
import { Container } from "@mui/material";
import { User } from "database";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";

import { Navigation, UserContext } from "@components";

const App = ({ Component, pageProps }: AppProps) => {
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
      <Navigation />
      <Container sx={{ mt: 5 }}>
        <Component {...pageProps} />
      </Container>
    </UserContext.Provider>
  );
};

export default App;
