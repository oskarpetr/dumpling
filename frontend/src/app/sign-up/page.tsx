"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import bcrypt from "bcryptjs-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { toast } from "sonner";
import { Title } from "@/components/Titles";
import { ArrowRight, Camera, Spinner } from "@phosphor-icons/react";
import { postAccount } from "@/utils/fetchers";
import { ref, uploadString } from "firebase/storage";
import { storage } from "@/utils/firebase";

export default function SignIn() {
  // fields states
  const [file, setFile] = useState<File>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState<
    string | undefined
  >();

  // error states
  const [errorUsername, setErrorUsername] = useState<string | undefined>();
  const [errorPassword, setErrorPassword] = useState<string | undefined>();
  const [errorFile, setErrorFile] = useState<string | undefined>();

  // avatar hover
  const [avatarHover, setAvatarHover] = useState(false);

  // router
  const router = useRouter();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // register
  const register = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (file === undefined) {
      setErrorFile("Select an avatar.");
      return;
    }

    if (file.size / 1000000 > 1) {
      setErrorFile("Avatar size must be smaller than 1MB.");
      return;
    }

    setErrorFile(undefined);

    if (username === "") {
      setErrorUsername("Username cannot be empty.");
      return;
    }

    setErrorUsername(undefined);

    if (password === "") {
      setErrorPassword("Password cannot be empty.");
      return;
    }

    setErrorPassword(undefined);

    setIsLoading(true);

    const encrypted = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    setEncryptedPassword(encrypted);
  };

  useEffect(() => {
    async function registerAccount() {
      const res = await postAccount(username, encryptedPassword!);

      if (axios.isAxiosError(res.error) && res.error.response?.status === 409) {
        setErrorUsername("Username already in use.");
        return;
      }

      if (res.isError) {
        toast.error("An error has occured.");
        return;
      }

      const storageRef = ref(storage, `avatars/${res.userId}`);
      await uploadString(storageRef, avatar, "data_url");

      router.push("/sign-in");

      toast.success("Your account has been created.");
    }

    if (encryptedPassword) {
      registerAccount();
    }
  }, [encryptedPassword]);

  // convert file to base 64 string
  useEffect(() => {
    if (file) getBase64(file);
  }, [file]);

  // file to base 64 string
  function getBase64(file: File) {
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
  }

  return (
    <div className="flex flex-col gap-6 h-screen justify-center items-center">
      <div className="w-[25rem] bg-white bg-opacity-10 border border-white border-opacity-10 px-12 py-8 rounded-xl">
        <Title title="Sign up" />

        <form className="flex flex-col gap-8" onSubmit={register}>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Avatar</p>

            <div className="flex items-center gap-6">
              <div
                className="relative"
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
              >
                <input
                  className="opacity-0 w-20 h-20"
                  placeholder="Choose file"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />

                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Avatar"
                    width={80}
                    height={80}
                    style={{ objectFit: "cover" }}
                    className="border w-20 h-20 border-white border-opacity-10 rounded-full absolute top-0 pointer-events-none cursor-pointer"
                  />
                ) : (
                  <div className="bg-white pointer-events-none absolute top-0 cursor-pointer bg-opacity-10 border border-white border-opacity-10 rounded-full w-20 h-20 focus:outline-none font-bold text-gray-300"></div>
                )}

                <div
                  className={cn(
                    "absolute top-0 left-0 bg-black p-7 rounded-full transition-all pointer-events-none",
                    avatar
                      ? avatarHover
                        ? "bg-opacity-50"
                        : "opacity-0"
                      : avatarHover
                      ? "bg-opacity-10"
                      : "bg-opacity-0"
                  )}
                >
                  <Camera className="text-2xl pointer-events-none cursor-pointer text-white" />
                </div>
              </div>

              {file && (
                <div>
                  <p className="font-semibold">Selected avatar</p>
                  <p className="opacity-50">{file?.name}</p>
                </div>
              )}
            </div>

            {errorFile && (
              <p className="text-red-400 font-semibold mt-1 text-sm">
                {errorFile}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold">Username</p>
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
            disabled={isLoading}
            type="submit"
          >
            Sign up
            {isLoading ? (
              <Spinner className="animate-spin text-lg text-white" />
            ) : (
              <ArrowRight className="text-white" />
            )}
          </button>
        </form>
      </div>

      <div className="tracking-wide flex gap-1">
        <p className="opacity-50">Already have an account?</p>
        <Link href={"/sign-in"} className="font-semibold opacity-80">
          Log in
        </Link>
      </div>
    </div>
  );
}
