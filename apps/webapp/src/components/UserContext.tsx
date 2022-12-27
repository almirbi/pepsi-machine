import { User } from "database";
import { createContext } from "react";

type ContextType = {
  user?: User;
  setUser?: (_val?: User) => void;
};

export const UserContext = createContext<ContextType>({
  user: undefined,
  setUser: undefined,
});
