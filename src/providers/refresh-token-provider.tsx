import { useTokenRefresh } from "../services/refetchToken";

const RefreshTokenProvider = ({ children }: { children: React.ReactNode }) => {
  useTokenRefresh();

  return <>{children}</>;
};

export default RefreshTokenProvider;
