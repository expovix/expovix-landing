import { useEffect } from "react";

export default function Register() {
  useEffect(() => {
    window.location.href = "/pages/login.html";
  }, []);
  return null;
}
