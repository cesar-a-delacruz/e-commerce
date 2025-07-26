import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { logout, getUser } from "../localstorage";

function useLogin() {
  const [info, setInfo] = useState({
    loading: true,
    logged: false,
  });
  const { replace } = useHistory();

  const checkLogin = useCallback(async () => {
    const user = getUser();
    if (!user) {
      replace("/");
      logout();
      return;
    }
    setInfo({ loading: false, logged: true });
  }, [replace]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);
  return { info: info };
}

export default useLogin;
