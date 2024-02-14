"use client"

import React from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

// This is my login button component, this does not work for now, I'm not sure why, I tried debugging for a while but didnt get anywhere so for now it has been replaced for the middleware.

const LoginButton = () => {
const { data: session } = useSession();

  return (
    <div>
      <button onClick={() => signIn()}>Sign in with Google</button>
    </div>
  );
}

export default LoginButton;