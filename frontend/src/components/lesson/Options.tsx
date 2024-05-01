import { Dispatch, SetStateAction } from "react";

interface Props {
  options: string[];
  answer: string | null;
  setAnswer: Dispatch<SetStateAction<string | null>>;
}

export default function Options({ options, answer, setAnswer }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => setAnswer(option)}
          className={`${
            answer === option
              ? "border-blue-500 bg-blue-600"
              : "border-neutral-700 bg-neutral-800"
          } w-full border border-b-4 py-3.5 rounded-xl transition-all active:border active:mt-[3px]`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
