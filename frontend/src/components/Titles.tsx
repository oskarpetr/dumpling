import { ReactNode } from "react";

interface Props {
  title: string | ReactNode;
}

export function Title({ title }: Props) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <h1 className="font-bold text-3xl">{title}</h1>
    </div>
  );
}

export function Subtitle({ title }: Props) {
  return <h2 className="font-bold text-2xl mb-6">{title}</h2>;
}
