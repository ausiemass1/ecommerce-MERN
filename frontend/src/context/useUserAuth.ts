import { useContext } from "react";
import { UserAuthContext } from "./UserAuthProvider";

export const useUserAuth = () => {
  const ctx = useContext(UserAuthContext);
  if (!ctx) {
    throw new Error("useUserAuth must be used inside UserAuthProvider");
  }
  return ctx;
};
