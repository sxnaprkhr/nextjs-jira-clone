"use client";
import { signIn, useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <button onClick={() => signIn()}>LOGIN</button>
      <p>{JSON.stringify(session)}</p>
    </>
  );
}
