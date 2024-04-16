interface Props {
  title: string;
}

export default function Title({ title }: Props) {
  return <h1 className="font-bold text-3xl mb-8">{title}</h1>;
}
