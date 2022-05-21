import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Crypto() {
  const cryptos = ["Bitcoin", "Ethereum", "Doge", "Aave", "XRP", "Shiba Inu"];
  const [user] = useAuthState(auth);
  return (
    <div className="flex h-screen">
      <div className="flex-[0.25] max-w-xs bg-blue-300 flex flex-col gap-4 p-6">
        {cryptos.map((a) => (
          <p className="p-4 leading-none rounded-md bg-black/5">{a}</p>
        ))}
        <div className="mt-auto">
          <p className="cursor-pointer p-4 leading-5 mb-4 rounded-md bg-black/5">
            Logged in as: {user.email}
          </p>
          <p
            className="cursor-pointer p-4 leading-none rounded-md bg-black/5"
            onClick={() => signOut(auth)}
          >
            Logout
          </p>
        </div>
      </div>
      <div className="flex-[0.75] bg-blue-100"></div>
    </div>
  );
}

export default Crypto;
