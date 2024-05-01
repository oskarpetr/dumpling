import NavBar from "../navbars/NavBar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <div className="p-20">{children}</div>
    </>
  );
}
