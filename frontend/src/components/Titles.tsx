import { ReactNode } from "react";

interface Props {
  title: string | ReactNode;
}

export function Title({ title }: Props) {
  return <h1 className="font-bold text-3xl mb-8">{title}</h1>;
}

export function Subtitle({ title }: Props) {
  return <h2 className="font-bold text-2xl mb-4">{title}</h2>;
}
