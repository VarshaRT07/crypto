import { Button, Title } from "@mantine/core";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "../firebase";
import Stats from "./Stats";
import { useRouter } from "next/router";
import Account from "./Account";

function Crypto() {
  const [symbol, setSymbol] = useState("btc");
  const [page, setPage] = useState("stats");
  const cryptos = [
    ["Bitcoin", "btc"],
    ["Ethereum", "eth"],
    ["Doge", "doge"],
    ["Binance Coin", "bnb"],
    ["XRP", "xrp"],
    ["Shiba Inu", "shib"],
  ];
  const [user] = useAuthState(auth);
  const router = useRouter();
  return (
    <div className="flex h-screen max-w-[1280px] mx-auto">
      <div className="flex-[0.25] border border-solid border-gray-400 flex flex-col gap-4 p-6">
        <Title order={3} className="mb-8">
          Crypto
        </Title>
        {cryptos.map((a) => (
          <Button
            radius="md"
            variant="light"
            color="blue"
            key={a}
            onClick={() => {
              setPage("stats");
              setSymbol(a[1]);
            }}
          >
            {a[0]}
          </Button>
        ))}
        <div className="mt-auto">
          <p className="cursor-pointer p-4 leading-5 mb-4 rounded-md bg-black/5">
            Logged in as: {user.email}
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => setPage("account")}
              color="green"
              radius="md"
            >
              My account
            </Button>
            <Button color="red" radius="md" onClick={() => signOut(auth)}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-[0.75] border border-solid border-gray-400 border-l-0">
        {page === "stats" && <Stats symbol={symbol} />}
        {page === "account" && <Account />}
      </div>
    </div>
  );
}

export default Crypto;
