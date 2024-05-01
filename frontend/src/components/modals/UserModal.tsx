import { cn } from "@/utils/cn";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserModal({ open, setOpen }: Props) {
  const options = [
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Logout",
      link: "/logout",
    },
  ];

  return (
    <div
      className={cn(
        "absolute px-8 py-6 bg-neutral-800 border border-neutral-700 rounded-xl top-20 left-20 transition-all cursor-auto",
        open
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <Link
            key={option.title}
            href={option.link}
            className={cn(
              "flex gap-4 items-center border-b border-neutral-700",
              index === options.length - 1
                ? "border-none"
                : "border-b border-neutral-700 pb-4"
            )}
          >
            <div className="text-neutral-300 font-bold text-sm">
              {option.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
