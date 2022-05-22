import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { Title } from "@mantine/core";
import Numeral from "react-numeral";

function Account() {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(null);
  useEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((doc) => setData(doc.data()));
  }, [user]);
  return (
    <div className="p-6">
      <Title order={3} className="mb-4">
        INR Balance: {data?.inr}
      </Title>
      <div>
        <Title order={3} className="mb-4">
          My Crypto Coins
        </Title>
        {data && !data.coins && <p>You do not have any crypto assets.</p>}
        <div className="flex flex-col gap-4">
          {data?.coins &&
            Object.entries(data.coins).map(([key, val]) => (
              <p className="uppercase flex gap-2 items-center">
                <span className="p-2 bg-gray-200 rounded-md">{key}</span>{" "}
                <span>
                  <Numeral value={val} format={"0,0.0000"} />
                </span>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
