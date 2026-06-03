import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    window.location.href = "/pages/login.html";
  }, []);
  return null;
}
