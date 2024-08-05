import { getAllBoard } from "@/app/actions/board";
import { SidenavItem } from "./sidenavitem";
import SidenavSeparator from "./SidenavSeparator";
import { auth } from "@/lib/auth";
import cx from "classnames";

interface SidenavProps {
  isMobileView?: boolean;
}

export const Sidenav = async (props: SidenavProps) => {
  const { isMobileView = false } = props;

  const boardsData = await getAllBoard();
  const session = await auth();
  if (!session) return <></>;

  return (
    <div
      className={cx("w-full sm:w-[250px] sidebar-bg", {
        ["hidden sm:block fixed mt-[60px] h-[calc(100vh-60px)]"]: !isMobileView,
      })}
    >
      {boardsData.map((board) => (
        <div key={board.id}>
          <SidenavItem {...board} />
          <SidenavSeparator />
        </div>
      ))}
    </div>
  );
};
