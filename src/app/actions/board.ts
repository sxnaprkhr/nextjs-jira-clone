"use server";
import { prisma } from "@/lib/prisma";
import type { Board, BoardTicket } from "@prisma/client";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllBoard() {
  return (await prisma.board.findMany({
    select: {
      id: true,
      title: true,
    },
  })) as Board[];
}
