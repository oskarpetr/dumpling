"use client";

import { Title } from "@/components/Titles";
import { ArrowRight, Spinner } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function SignIn() {
  // router
  const router = useRouter();

  // fields states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // error states
  const [errorUsername, setErrorUsername] = useState<string | undefined>();
  const [errorPassword, setErrorPassword] = useState<string | undefined>();

  const [loading, setLoading] = useState(false);

  // log in
  const logIn = async (e: FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (username === "") {
      setErrorUsername("Password cannot be empty.");
      return;
    }

    if (password === "") {
      setErrorPassword("Password cannot be empty.");
      return;
    }

    setErrorPassword(undefined);

    setLoading(true);

    const signInRes = await signIn("credentials", {
      email: username,
      password: password,
      callbackUrl: "/",
      redirect: false,
    });

    if (signInRes?.ok) {
      router.push(signInRes.url!);
      toast.success("You have been signed in.");
    } else if (signInRes?.error) {
      console.log(signInRes);
      if (signInRes?.status === 401) {
        toast.error("Wrong password.");
      } else if (signInRes?.status === 404) {
        toast.error("Username does not exist.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 h-screen justify-center items-center">
      <div className="w-[25rem] bg-white bg-opacity-10 border border-white border-opacity-10 px-12 py-8 rounded-xl">
        <Title title="Sign in" />

        <form className="flex flex-col gap-8" onSubmit={logIn}>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Email</p>
            <input
              className="w-full border border-neutral-600 bg-neutral-700 rounded-xl focus:outline-none text-white px-6 py-2"
              placeholder="Enter username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {errorUsername && (
              <p className="text-red-400 font-semibold mt-1 text-sm">
                {errorUsername}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold">Password</p>
            <input
              className="w-full border border-neutral-600 bg-neutral-700 rounded-xl focus:outline-none text-white px-6 py-2"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errorPassword && (
              <p className="text-red-400 font-semibold mt-1 text-sm">
                {errorPassword}
              </p>
            )}
          </div>

          <button
            className="w-full py-2 mt-4 rounded-xl font-semibold bg-blue-600 flex gap-2 items-center justify-center border-blue-500 border border-b-4 active:border active:mt-[3px] transition-all"
            disabled={loading}
            type="submit"
          >
            Sign in
            {loading ? (
              <Spinner className="animate-spin text-lg text-white" />
            ) : (
              <ArrowRight className="text-white" />
            )}
          </button>
        </form>
      </div>

      <div className="tracking-wide flex gap-1">
        <p className="opacity-50">Don&apos;t have an account yet?</p>
        <Link href={"/sign-up"} className="font-bold opacity-80">
          Register
        </Link>
      </div>
    </div>
  );
}
