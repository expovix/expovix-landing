import { useEffect } from "react";

export default function ForgotPassword() {
  useEffect(() => {
    window.location.href = "/pages/login.html";
  }, []);
  return null;
}
