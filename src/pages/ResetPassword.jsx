import { useEffect } from "react";

export default function ResetPassword() {
  useEffect(() => {
    window.location.href = "/pages/login.html";
  }, []);
  return null;
}
