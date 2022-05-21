import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/Login";
import Auth from "../components/Auth";
import Crypto from "../components/Crypto";
import { Loader } from "@mantine/core";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <Loader />
      </div>
    );
  } else {
    if (user) {
      return <Crypto />;
    } else {
      return <Auth />;
    }
  }
}
