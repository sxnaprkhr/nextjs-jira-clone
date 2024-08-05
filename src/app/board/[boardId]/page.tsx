import { fetchBoard } from "@/app/actions/board";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

const page = async (props: BoardPageProps) => {
  const { params } = props;
  const { data } = await fetchBoard(params.boardId);
  console.log(data);
  return <div className="pt-16 sm:ml-[250px]">BAORD - {params.boardId}</div>;
};

export default page;
