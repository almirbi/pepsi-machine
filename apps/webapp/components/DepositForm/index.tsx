import { useContext, useState } from "react";
import { apiClient } from "../api";
import { AxiosError } from "axios";
import ShowErrors from "../ShowErrors";
import RupeeButton from "./RupeeButton";
import { DEPOSIT_SIZES } from "../../constants";
import {
  Badge,
  Box,
  Button,
  Chip,
  Container,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Rupee } from "../../types";
import { UserContext } from "../UserContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { yellow } from "@mui/material/colors";

type State = {
  size?: Rupee;
  isMachineReloading?: boolean;
  progress: number;
  progressInterval?: NodeJS.Timer;
};

export default function DepositForm() {
  const [error, setError] = useState<AxiosError>();

  const [state, setState] = useState<State>({ progress: 0 });
  const [snackOpen, setSnackOpen] = useState(false);

  const TOTAL = 100;
  const STEP = 10;
  const SPEED = 50;
  const { setUser } = useContext(UserContext);
  const startProgress = () => {
    setState((current) => ({ ...current, progress: 0 }));

    const intervalProgress = setInterval(() => {
      setState((current) => {
        if (current.progress >= TOTAL) {
          clearInterval(intervalProgress);
          setSnackOpen(false);

          return {
            ...current,
            isMachineReloading: false,
          };
        }
        return { ...current, progress: current.progress + STEP };
      });
    }, SPEED);
  };

  const startMachineReload = (size: Rupee) => {
    setState((current) => ({
      ...current,
      size,
      isMachineReloading: true,
    }));
    setSnackOpen(true);

    startProgress();
  };

  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mb={5}
        >
          <Typography mb={5} textAlign="center" variant="h4" marginBottom={0}>
            deposit rupees
          </Typography>
          <Chip
            color="secondary"
            variant="outlined"
            sx={{ ml: 2, width: 100 }}
            label={
              <Box display="flex" alignItems="center">
                <Typography color={yellow}>{user.deposit / 100}</Typography>
                <CurrencyRupeeIcon />
              </Box>
            }
          />
        </Stack>

        <Stack mt={12} direction="row" justifyContent="center">
          {DEPOSIT_SIZES.map((size) => (
            <Badge badgeContent={size / 100} color="secondary">
              <RupeeButton
                key={size}
                disabled={state.isMachineReloading}
                size={size}
                onClick={async () => {
                  try {
                    const { data: updatedUser } = await apiClient.post(
                      "/deposit",
                      {
                        deposit: size,
                      }
                    );
                    setUser?.(updatedUser);
                    startMachineReload(size);
                  } catch (e) {
                    setError(e as AxiosError);
                  }
                }}
              />
            </Badge>
          ))}
        </Stack>
        <Box>
          <Container sx={{ width: "60%", height: 60, mt: 4 }}>
            {state.isMachineReloading && (
              <LinearProgress variant="determinate" value={state.progress} />
            )}
          </Container>
        </Box>
        <Box textAlign="center">
          <Button
            onClick={async () => {
              try {
                await apiClient.post("/reset");
                const user = await apiClient.get("/auth/me");
                setUser?.(user.data);
              } catch (e) {
                setError(e as AxiosError);
              }
            }}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            reset deposit to 0
          </Button>
        </Box>

        <Box>
          <ShowErrors error={error as AxiosError} />
        </Box>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackOpen}
        message={`added ${state.size} rupees to your deposit`}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={state.isMachineReloading}
        message={`machine reloading.`}
      />
    </>
  );
}
