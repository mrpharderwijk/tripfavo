import Image from "next/image";
import { ReactElement } from "react";

export function Avatar(): ReactElement {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src="/placeholder.png"
    />
  );
}