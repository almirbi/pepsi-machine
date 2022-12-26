import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { apiClient } from "./api";
import { useRouter } from "next/router";
import { UserContext } from "../pages/_app";

const pages = ["login", "register", "products", "deposit", "logout-all"];

export default function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const router = useRouter();

  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    (async () => {
      try {
        if (!user) {
          const user = await apiClient.get("/auth/me");
          setUser?.(user.data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [setUser, user]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                setAnchorElNav(event.currentTarget);
              }}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                setAnchorElNav(null);
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link key={page} href={`/${page}`}>
                  {page}
                </Link>
              ))}
              <Button variant="outlined" endIcon={<LogoutIcon />}>
                Logout
              </Button>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              gap: 5,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Link key={page} href={`/${page}`}>
                <Typography color="white">{page}</Typography>
              </Link>
            ))}
            {user && (
              <Button
                sx={{
                  background: "white",
                  "&:hover": {
                    background: "white",
                  },
                }}
                variant="outlined"
                endIcon={<LogoutIcon />}
                onClick={async () => {
                  try {
                    await apiClient.post("/auth/logout");
                    setUser?.(undefined);
                  } catch (e) {
                    console.log(e);
                  }

                  router.push("/login");
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
