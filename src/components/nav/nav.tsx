"use client";
import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import customHooks from "@/hooks";
import NavAvatar from "./NavAvatar";
import NavToggle from "./NavToggle";
import { NavDataType } from "./nav.types";
import { useSession } from "next-auth/react";

interface Composition {
  children: ReactNode;
  authOnly?: Boolean;
}

const NavContainer = (props: Composition) => {
  const { children } = props;
  const { useWindowDimensions } = customHooks;
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
          data-testid="hamburger"
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
  const { children, authOnly = false } = props;
  const { status } = useSession();
  if (authOnly && status === "unauthenticated") return <></>;

  return (
    <div className="background-nav text-white sm:mr-3 p-2 border rounded font-semibold border-none">
      {children}
    </div>
  );
};

interface NavbarPropsInterface {
  externalNavData?: NavDataType;
}

export const Navbar = (props: NavbarPropsInterface) => {
  const { externalNavData } = props;
  const [navConfig, setNavConfig] = useState<NavDataType>([]);

  useEffect(() => {
    const fetchNavbarConfig = async () => {
      const response = await fetch("/api/config");
      const { data } = await response.json();
      setNavConfig(data.navData as NavDataType);
    };

    if (!externalNavData) fetchNavbarConfig();
    else setNavConfig(externalNavData);
  }, [externalNavData]);

  const navItemsMap = {
    logo: NavLogo,
    item: NavItem,
    avatar: NavAvatar,
    toggle: NavToggle,
  };

  return (
    <NavContainer>
      <NavRenderer>
        {navConfig?.map((navGroup) => (
          <NavGroup key={navGroup?.id}>
            {navGroup?.items?.map((navItem) => {
              const Component = navItemsMap[navItem?.type] || <></>;
              return (
                <Component key={navItem?.id} authOnly={navItem?.authOnly}>
                  {navItem?.content}
                </Component>
              );
            })}
          </NavGroup>
        ))}
      </NavRenderer>
    </NavContainer>
  );
};
