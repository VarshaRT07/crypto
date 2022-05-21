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
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../firebase";

function Login({ setCurrForm }) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = (values) => {
    setError("");
    setLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .catch((e) => {
        console.log(e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <form onSubmit={form.onSubmit(signIn)}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <p className="font-bold text-lg -mt-2 mb-8 text-center">Login</p>
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
          placeholder="Your password"
          mt="md"
          {...form.getInputProps("password")}
        />

        <Button loading={loading} size="md" fullWidth mt="xl" type="submit">
          Sign in
        </Button>
        <p className="mt-8 text-center">
          Don&apos;t have an account?{" "}
          <Anchor onClick={() => setCurrForm("signup")}>Sign Up</Anchor>
        </p>
      </Paper>
    </form>
  );
}

export default Login;
