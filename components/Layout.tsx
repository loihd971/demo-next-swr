import React, { ReactNode } from "react";
import { Roboto } from "next/font/google";
import Nav from "@/components/Nav";

type Props = {
  children: ReactNode;
};

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function Layout({ children }: Props) {
  return (
    <div className={roboto.className}>
      <Nav />
      {children}
    </div>
  );
}
