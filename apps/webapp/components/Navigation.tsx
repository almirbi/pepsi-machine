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
import Button, { ButtonProps } from "@mui/material/Button";
import { apiClient } from "./api";
import { useRouter } from "next/router";
import { Badge, Stack, styled } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { UserContext } from "./UserContext";

const pages = ["login", "register", "products", "deposit", "logout-all"];
import { deepPurple } from "@mui/material/colors";

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
      <Container maxWidth="lg">
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
          </Box>
          <Stack direction="row" alignItems="center" gap={5}>
            {user && (
              <>
                <NavigationButton
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
                </NavigationButton>

                <Badge
                  sx={{ cursor: "pointer" }}
                  badgeContent={user.deposit}
                  max={999999}
                >
                  <Link href="/deposit">
                    <CurrencyRupeeIcon color="action" />
                  </Link>
                </Badge>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const NavigationButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
  "&:hover": {
    backgroundColor: deepPurple[700],
  },
}));
