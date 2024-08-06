import { BoardColumn, BoardTicket } from "@prisma/client";
import { Ticket } from "./ticket";

interface BoardTicketWithUser extends BoardTicket {
  assignedUser: {
    name: string;
  };
}

interface BoardProps {
  boardColumns: BoardColumn[];
  boardTickets: BoardTicketWithUser[];
}

const Board = (props: BoardProps) => {
  const { boardColumns, boardTickets } = props;

  const getTickets = (id: string) => {
    return boardTickets.filter((ticket) => ticket.boardColumnId === id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {boardColumns.map((col) => (
        <div
          key={col?.id}
          className="grow basis-full background-neutral-static p-2"
        >
          <div className="text-subtlest font-semibold text-sm mb-5">
            {col?.label}
          </div>
          {getTickets(col?.id).map((ticket) => (
            <Ticket
              key={ticket?.id}
              title={ticket?.title}
              storyPoints={ticket?.storyPoints}
              assignedTo={ticket?.assignedUser?.name}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export { Board };
