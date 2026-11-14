import { createContext, Dispatch, SetStateAction } from "react";
import { ApiResponseType } from "./ApiResponse";

export type ThemeMode = "light" | "dark" | "system";

export type NetworkContextType = {
  Info: ApiResponseType | null;
  SetInfo: Dispatch<SetStateAction<ApiResponseType | null>>;
  loading: boolean;
  error: string | null;
  refetch: (target?: string) => Promise<void>;
  theme: ThemeMode;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: ThemeMode) => void;
  historyOpen: boolean;
  setHistoryOpen: (open: boolean) => void;
  jsonModalOpen: boolean;
  setJsonModalOpen: (open: boolean) => void;
};

export const NetworkInfoContext = createContext<NetworkContextType>({
  Info: null,
  SetInfo: () => {},
  loading: false,
  error: null,
  refetch: async () => {},
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
  historyOpen: false,
  setHistoryOpen: () => {},
  jsonModalOpen: false,
  setJsonModalOpen: () => {},
});
