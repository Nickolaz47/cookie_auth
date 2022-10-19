// Hooks
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const [auth, setAuth] = useState(false);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);

  return { auth };
};
