import { cn } from "@/utils/cn";
import { MatchingType } from "@/utils/lesson-practise.types";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  matching: MatchingType;
  answered: boolean;
  setAnswered: Dispatch<SetStateAction<boolean>>;
  onReset: boolean;
}

export default function Matching({
  matching,
  answered,
  setAnswered,
  onReset,
}: Props) {
  const [pairs, setPairs] = useState(matching.pairs);
  const [value, setValue] = useState<string | null>();
  const [meaning, setMeaning] = useState<string | null>();
  const [selectedPairs, setSelectedPairs] = useState(0);

  useEffect(() => {
    if (value && meaning) {
      const pairsCopy = [...pairs];
      const prevValueIndex = pairsCopy.findIndex((pair) => pair[0] === value);
      const prevMeaningIndex = pairsCopy.findIndex(
        (pair) => pair[1] === meaning
      );

      pairsCopy[prevValueIndex][0] = pairsCopy[selectedPairs][0];
      pairsCopy[selectedPairs][0] = value;
      pairsCopy[prevMeaningIndex][1] = pairsCopy[selectedPairs][1];
      pairsCopy[selectedPairs][1] = meaning;

      setTimeout(() => {
        setPairs(pairsCopy);

        setTimeout(() => {
          setValue(null);
          setMeaning(null);

          setSelectedPairs((prev) => prev + 1);
        }, 250);
      }, 250);
    }
  }, [value, meaning]);

  useEffect(() => {
    if (selectedPairs === pairs.length - 1) {
      setAnswered(true);
    }
    console.log(pairs);
  }, [pairs]);

  useEffect(() => {
    if (onReset) {
      setPairs([]);
      setValue(null);
      setMeaning(null);
      setSelectedPairs(0);
      setAnswered(false);
    }
  }, [onReset]);

  return (
    <div
      className="grid grid-cols-1 gap-4 transition-all"
      key={matching.answers.toString()}
    >
      {pairs.map((pair, index) => {
        const correct =
          answered &&
          matching.answers.find((answer) => answer[0] == pair[0])![1] ==
            pair[1];
        console.log(correct);

        return (
          <div
            key={pair.toString()}
            className={`${
              selectedPairs > index ? "gap-0" : "gap-8"
            } flex items-center w-full`}
          >
            <button
              key={pair[0]}
              onClick={() => setValue(pair[0])}
              disabled={selectedPairs > index}
              className={cn(
                "w-full flex items-center justify-center px-6 border border-b-4 py-3.5 rounded-xl transition-all active:border active:mt-[3px]",
                value === pair[0]
                  ? "border-neutral-600 bg-neutral-700"
                  : "border-neutral-700 bg-neutral-800",
                answered
                  ? correct
                    ? "border-blue-500 bg-blue-600"
                    : "border-red-600 bg-red-700"
                  : ""
              )}
            >
              <div>{pair[0]}</div>
            </button>

            {selectedPairs > index && (
              <div className="h-[1px] w-[4.6rem] bg-neutral-700"></div>
            )}

            <button
              key={pair[1]}
              onClick={() => setMeaning(pair[1])}
              disabled={selectedPairs > index}
              className={cn(
                "w-full flex items-center justify-center px-6 border border-b-4 py-3.5 rounded-xl transition-all active:border active:mt-[3px]",
                meaning === pair[1]
                  ? "border-neutral-600 bg-neutral-700"
                  : "border-neutral-700 bg-neutral-800",
                answered
                  ? correct
                    ? "border-blue-500 bg-blue-600"
                    : "border-red-600 bg-red-700"
                  : ""
              )}
            >
              <div>{pair[1]}</div>
              <div className="absolute ml-60">
                {answered && (
                  <>
                    {correct ? (
                      <CheckCircle weight="fill" size={24} />
                    ) : (
                      <XCircle weight="fill" size={24} />
                    )}
                  </>
                )}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
