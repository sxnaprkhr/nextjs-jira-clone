"use client";
import { Button } from "@/components/button";
import { signIn, useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Button onClick={signIn} label="Login" />
      <p className="text-inverse">{JSON.stringify(session)}</p>
      <Button label="Click Me" />
    </>
  );
}
