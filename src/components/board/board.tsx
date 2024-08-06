"use client";
import { BoardColumn, BoardTicket } from "@prisma/client";
import {
  Droppable,
  DragDropContext,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { Ticket } from "./ticket";
import { useState } from "react";
import { updateTicketAtBackend } from "@/app/actions/board";

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
  const { boardColumns, boardTickets = [] } = props;

  const [tickets, setTickets] = useState<BoardTicketWithUser[]>(boardTickets);

  const getTickets = (id: string) => {
    return tickets
      .filter((ticket) => ticket.boardColumnId === id)
      .sort((a, b) => a.position - b.position);
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    const currentTickets = JSON.parse(JSON.stringify(tickets));
    const updatedTickets = currentTickets.map((ticket: BoardTicketWithUser) => {
      if (ticket.id === result.draggableId)
        return {
          ...ticket,
          boardColumnId: result.destination?.droppableId,
          position: result.destination?.index,
        };
      else if (
        ticket.boardColumnId === result.destination?.droppableId &&
        ticket.position >= result.destination?.index
      ) {
        return { ...ticket, position: ticket.position + 1 };
      } else if (
        ticket.boardColumnId === result.source.droppableId &&
        ticket.position > result.source.index
      ) {
        return { ...ticket, position: ticket.position - 1 };
      }
      return ticket;
    });
    setTickets(updatedTickets);
    updateTicketAtBackend(updatedTickets);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col sm:flex-row gap-3">
        {boardColumns.map((col) => (
          <Droppable key={col?.id} droppableId={col?.id}>
            {(provided, snapshot) => (
              <div
                className="grow basis-full background-neutral-static p-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="text-subtlest font-semibold text-sm mb-5">
                  {col?.label}
                </div>
                {getTickets(col?.id).map((ticket, index) => (
                  <Ticket
                    key={ticket?.id}
                    id={ticket?.id}
                    index={index}
                    title={ticket?.title}
                    storyPoints={ticket?.storyPoints}
                    assignedTo={ticket?.assignedUser?.name}
                  />
                ))}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export { Board };
