"use client";
import { Drawer } from "@material-tailwind/react";
import { ReactNode, useState } from "react";
import { Component1Icon } from "@radix-ui/react-icons";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface SidenavMobileProps {
  children: ReactNode;
}

export const SidenavMobile = (props: SidenavMobileProps) => {
  const { children } = props;

  const { isDesktop } = useWindowDimensions();

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  if (isDesktop) return <></>;

  return (
    <>
      <Component1Icon
        height={30}
        width={30}
        className="text-white absolute z-[2] left-3 top-3"
        onClick={openDrawer}
      />
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="sidebar-bg"
        placement="bottom"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {children}
      </Drawer>
    </>
  );
};
