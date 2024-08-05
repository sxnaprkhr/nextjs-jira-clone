import { getAllBoard } from "@/app/actions/board";
import { SidenavItem } from "./sidenavitem";
import SidenavSeparator from "./SidenavSeparator";
import { auth } from "@/lib/auth";

export const Sidenav = async () => {
  const boardsData = await getAllBoard();
  const session = await auth();
  if (!session) return <></>;

  return (
    <div className="fixed mt-[60px] w-full sm:w-[250px] sidebar-bg">
      {boardsData.map((board) => (
        <div key={board.id}>
          <SidenavItem {...board} />
          <SidenavSeparator />
        </div>
      ))}
    </div>
  );
};
