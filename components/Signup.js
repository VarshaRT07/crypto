import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth, db } from "../firebase";

function Signup({ setCurrForm }) {
  const pwdREquirements = [
    { re: /[0-9]/, label: "Must include number" },
    { re: /[a-z]/, label: "Must include lowercase letter" },
    { re: /[A-Z]/, label: "Must include uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Must include special symbol" },
  ];

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      password: (value) => {
        const errorArray = pwdREquirements.map((e) =>
          e.re.test(value) ? null : e.label
        );
        errorArray.push(
          value.length < 6 ? "Must be atleast 6 characters" : null
        );
        errorArray.push(
          value.length > 10 ? "Must be within 10 characters" : null
        );
        const filteredArray = errorArray.filter((e) => e);
        console.log(filteredArray);
        if (filteredArray.length > 0) {
          return filteredArray.map((e, i) => <p key={i}>{e}</p>);
        } else {
          return null;
        }
      },
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = (values) => {
    setError("");
    setLoading(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        console.log(user);
        return setDoc(doc(db, "users", user.user.uid), {
          inr: 1000,
        });
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <form onSubmit={form.onSubmit(signUp)}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <p className="font-bold text-lg -mt-2 mb-8 text-center">Sign Up</p>
        {error && (
          <p className="bg-red-100 rounded-md text-red-500 mb-8 p-4 text-sm">
            {error}
          </p>
        )}
        <TextInput
          size="md"
          label="Email"
          placeholder="john@gmail.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          size="md"
          label="Password"
          placeholder="**********"
          mt="md"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          size="md"
          label="Confirm Password"
          placeholder="**********"
          mt="md"
          {...form.getInputProps("confirmPassword")}
        />

        <Button loading={loading} size="md" fullWidth mt="xl" type="submit">
          Sign Up
        </Button>
        <p className="mt-8 text-center">
          Already have an account?{" "}
          <Anchor onClick={() => setCurrForm("login")}>Sign In</Anchor>
        </p>
      </Paper>
    </form>
  );
}

export default Signup;
