"use client"

import React from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const LoginButton = () => {
const { data: session } = useSession();


  return (
    <div>
      <button onClick={() => signIn()}>Sign in with Google</button>
    </div>
  );
}

export default LoginButton;