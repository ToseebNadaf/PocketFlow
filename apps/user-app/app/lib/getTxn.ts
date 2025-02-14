import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

async function getAllTransactions() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const sentP2PTransfers = await prisma.p2pTransfer.findMany({
    where: { fromUserId: userId },
    select: {
      amount: true,
      timestamp: true,
    },
  });

  const receivedP2PTransfers = await prisma.p2pTransfer.findMany({
    where: { toUserId: userId },
    select: {
      amount: true,
      timestamp: true,
    },
  });

  const onRampTransactions = await prisma.onRampTransaction.findMany({
    where: { userId: userId },
    select: {
      amount: true,
      startTime: true,
    },
  });

  const offRampTransactions = await prisma.ofRampTransaction.findMany({
    where: { userId: userId },
    select: {
      amount: true,
      startTime: true,
    },
  });

  const transactions = [
    ...sentP2PTransfers.map((t: { amount: number; timestamp: any }) => ({
      amount: t.amount / 100,
      date: t.timestamp,
      type: "sent",
    })),
    ...receivedP2PTransfers.map((t: { amount: number; timestamp: any }) => ({
      amount: t.amount / 100,
      date: t.timestamp,
      type: "received",
    })),
    ...onRampTransactions.map((t: { amount: number; startTime: any }) => ({
      amount: t.amount / 100,
      date: t.startTime,
      type: "received",
    })),
    ...offRampTransactions.map((t: { amount: number; startTime: any }) => ({
      amount: t.amount / 100,
      date: t.startTime,
      type: "sent",
    })),
  ];

  return transactions;
}

export default getAllTransactions;
