"use client";
import { useBalance } from "@repo/store/balance";

type Props = {};

const Page = (props: Props) => {
  const balance = useBalance();

  return <div>page {balance}</div>;
};

export default Page;
