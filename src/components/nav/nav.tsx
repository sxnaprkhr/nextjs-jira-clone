"use client";
import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import NavAvatar from "./NavAvatar";
import NavToggle from "./NavToggle";

interface Composition {
  children: ReactNode;
}

const NavContainer = (props: Composition) => {
  const { children } = props;
  const { isDesktop } = useWindowDimensions();

  const [showNav, toggleNav] = useState(false);

  useEffect(() => {
    toggleNav(isDesktop);
  }, [isDesktop]);

  return (
    <nav className="fixed w-full bg-navBg">
      {!isDesktop && (
        <HamburgerMenuIcon
          height={30}
          width={30}
          className="text-white ml-auto mr-3 my-3"
          onClick={() => toggleNav(!showNav)}
        />
      )}
      {showNav && children}
    </nav>
  );
};

const NavRenderer = (props: Composition) => {
  const { children } = props;

  return (
    <div className="h-screen sm:h-[60px] flex flex-col sm:flex-row items-center sm:justify-between ml-3 mr-3">
      {children}
    </div>
  );
};

const NavGroup = (props: Composition) => {
  const { children } = props;

  return (
    <div className="flex flex-col sm:flex-row items-center">{children}</div>
  );
};

const NavLogo = (props: Composition) => {
  const { children } = props;

  return <div className="text-white">{children}</div>;
};

const NavItem = (props: Composition) => {
  const { children } = props;

  return (
    <div className="text-white sm:mr-3 p-2 border rounded font-semibold border-none">
      {children}
    </div>
  );
};

export const Navbar = () => {
  return (
    <NavContainer>
      <NavRenderer>
        <NavGroup>
          <NavLogo>LOGO</NavLogo>
        </NavGroup>
        <NavGroup>
          <NavItem>Your Work</NavItem>
          <NavItem>Projects</NavItem>
          <NavItem>Filters</NavItem>
        </NavGroup>
        <NavGroup>
          <NavAvatar />
          <NavToggle />
        </NavGroup>
      </NavRenderer>
    </NavContainer>
  );
};
