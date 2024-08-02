"use client";
import React, { useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { signIn, signOut, useSession } from "next-auth/react";

const NavAvatar = () => {
  const { data: session, status } = useSession();
  const [showPopup, togglePopup] = useState(false);

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  return (
    <div className="relative sm:mr-3">
      {isLoading && (
        <Avatar.Root className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Fallback className="animate-pulse skeleton w-full h-full" />
        </Avatar.Root>
      )}
      {!isLoading && !isLoggedIn && (
        <button
          className="cursor-pointer text-inverse button-brand p-2 rounded-sm"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
      {!isLoading && isLoggedIn && (
        <Avatar.Root
          className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle"
          onClick={() => togglePopup(!showPopup)}
        >
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover cursor-pointer"
            src={session?.user?.image || ""}
            alt="Profile Picture"
            data-testid="profile_picture"
            onClick={() => togglePopup(!showPopup)}
          />
          <Avatar.Fallback className="animate-pulse skeleton w-full h-full" />
        </Avatar.Root>
      )}
      {showPopup && (
        <button
          className="absolute cursor-pointer text-inverse button-brand top-full right-0 p-2 rounded-sm"
          onClick={() => signOut()}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default NavAvatar;
