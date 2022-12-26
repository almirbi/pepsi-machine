import { useContext, useState } from "react";
import { apiClient } from "../api";
import { AxiosError } from "axios";
import ShowErrors from "../ShowErrors";
import RupeeButton from "./RupeeButton";
import { DEPOSIT_SIZES } from "../../constants";
import {
  Box,
  Container,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Rupee } from "../../types";
import { UserContext } from "../UserContext";

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

  return (
    <>
      <Stack spacing={2}>
        <Typography mb={5} textAlign="center" variant="h4">
          deposit rupees
        </Typography>
        <Stack mt={12} direction="row" justifyContent="center">
          {DEPOSIT_SIZES.map((size) => (
            <RupeeButton
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
          ))}
        </Stack>
        <Box>
          {state.isMachineReloading && (
            <Container sx={{ width: "60%" }}>
              <LinearProgress variant="determinate" value={state.progress} />
            </Container>
          )}
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
