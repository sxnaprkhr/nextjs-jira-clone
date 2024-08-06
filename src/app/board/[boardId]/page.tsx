import { fetchBoard } from "@/app/actions/board";
import { Board } from "@/components/board";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

const page = async (props: BoardPageProps) => {
  const { params } = props;
  const { data } = await fetchBoard(params.boardId);
  return (
    <div className="pt-16 px-0 sm:px-3 sm:ml-[250px]">
      <Board
        boardColumns={data?.boardColumn}
        boardTickets={data?.boardTickets}
      />
    </div>
  );
};

export default page;
