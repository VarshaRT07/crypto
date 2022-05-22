import { Button, Title } from "@mantine/core";
import axios from "axios";
import { doc, getDoc, increment, setDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Numeral from "react-numeral";
import { auth, db } from "../firebase";

function Stats({ symbol }) {
  const [data, setData] = useState(null);

  const [user] = useAuthState(auth);
  const docRef = doc(db, "users", user.uid);
  useEffect(() => {
    setData(null);
    fetch("https://api.wazirx.com/sapi/v1/tickers/24hr")
      .then((res) => res.json())
      .then((res) =>
        setData(...res.filter((a) => a.symbol === symbol + "inr"))
      );
  }, [symbol]);

  const buyCoin = async () => {
    const inrBal = await (await getDoc(docRef)).data();
    const count = prompt("Enter number of coins to buy: ");
    const price = count * data.lastPrice;
    if (price <= inrBal.inr) {
      setDoc(
        docRef,
        {
          inr: increment(-price),
          coins: {
            [symbol]: increment(count),
          },
        },
        { merge: true }
      ).then(() => alert("Done"));
    } else {
      alert("Insufficient INR Balance");
    }
    console.log(inrBal.inr);
  };
  const sellCoin = async () => {
    const userData = await (await getDoc(docRef)).data();
    const count = prompt("Enter number of coins to sell: ");

    const coinCount = userData.coins[symbol];
    const price = count * data.lastPrice;

    if (coinCount && count <= coinCount) {
      setDoc(
        docRef,
        {
          inr: increment(price),
          coins: {
            [symbol]: increment(-count),
          },
        },
        { merge: true }
      ).then(() => alert("Done"));
    } else {
      alert("Insufficient " + symbol + " Balance");
    }
  };
  return (
    <div className="p-6">
      <Title className="uppercase">{data?.baseAsset}</Title>
      <Title order={3}>
        {data && "INR"} <Numeral value={data?.openPrice} format={"0,0.0000"} />
      </Title>
      <div className="flex gap-4 mt-8">
        <Button onClick={buyCoin}>Buy</Button>
        <Button onClick={sellCoin}>Sell</Button>
      </div>
    </div>
  );
}

export default Stats;
