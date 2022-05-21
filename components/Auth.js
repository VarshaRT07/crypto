import React from "react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Auth() {
  const [currForm, setCurrForm] = useState("login");
  return (
    <div className=" max-w-md mx-auto mt-40 h-screen">
      {currForm === "login" ? (
        <Login setCurrForm={setCurrForm} />
      ) : (
        <Signup setCurrForm={setCurrForm} />
      )}
    </div>
  );
}

export default Auth;
