"use client";
import { usePathname, useRouter } from "next/navigation";
import cx from "classnames";

interface SidenavItemProps {
  id: string;
  title: string;
}

export const SidenavItem = (props: SidenavItemProps) => {
  const { id, title } = props;
  const router = useRouter();
  const path = usePathname();
  const boardId = path.split("/")[2];
  return (
    <div
      className={cx(
        "p-4 hover:bg-blue-300 hover:dark:bg-blue-800 cursor-pointer font-semibold text-sm",
        {
          "bg-blue-800": boardId === id,
        }
      )}
      onClick={() => router.push(`/board/${id}`)}
    >
      {title}
    </div>
  );
};
