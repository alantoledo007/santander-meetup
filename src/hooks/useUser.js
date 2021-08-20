import { useEffect, useState } from "react";
import { isAdminHandler, onAuthStateChange } from "src/firebase/auth";
import { ADMIN_STATES, USER_STATES } from "src/core/constants";
import { useSelector } from "react-redux";

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOW);
  const { isAdmin } = useSelector((state) => state.app);

  useEffect(() => {
    onAuthStateChange((user) => {
      isAdminHandler(user);
      setUser(user);
    });
  }, []);

  return {
    data: { ...user, isAdmin },
    isAuthenticated: () =>
      user && user.uid && isAdmin !== ADMIN_STATES.NOT_KNOW,
    isUnknow: () =>
      user === USER_STATES.NOT_KNOW || isAdmin === ADMIN_STATES.NOT_KNOW,
  };
}
