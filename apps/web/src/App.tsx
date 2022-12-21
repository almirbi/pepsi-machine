import React from "react";
import Register from "./auth/Register";
import Container from "@mui/material/Container";

function App() {
  return (
    <Container sx={{ mt: 4 }} maxWidth="sm">
      <Register />
    </Container>
  );
}

export default App;
