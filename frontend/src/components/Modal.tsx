import { X } from "@phosphor-icons/react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Subtitle } from "./Titles";
import { cn } from "@/utils/cn";

export default function Modal({
  title,
  isOpen,
  setIsOpen,
  children,
}: {
  title: string | ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={cn(
          "bg-neutral-800 border border-neutral-700 p-8 rounded-xl w-[30rem] transition-all duration-300",
          isOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex justify-between items-start">
          <Subtitle title={title} />
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
