import { MatchingType } from "@/utils/lesson-practise.types";
import { useEffect, useState } from "react";

interface Props {
  matching: MatchingType;
}

export default function Matching({ matching }: Props) {
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
        }, 500);
      }, 500);
    }
  }, [value, meaning]);
  return (
    <div
      className="grid grid-cols-1 gap-4 transition-all"
      key={matching.answers.toString()}
    >
      {pairs.map((pair, index) => (
        <div
          key={pair.toString()}
          className={`${
            selectedPairs > index ? "gap-0" : "gap-8"
          } flex items-center w-full`}
        >
          <button
            key={pair[0]}
            onClick={() => {
              setValue(pair[0]);
            }}
            disabled={selectedPairs > index}
            className={`${
              value === pair[0]
                ? "border-neutral-600 bg-neutral-700"
                : "border-neutral-700 bg-neutral-800"
            } w-full flex items-center justify-center px-6 border border-b-4 py-3.5 rounded-xl transition-all active:border active:mt-[3px]`}
          >
            <div>{pair[0]}</div>
          </button>

          {selectedPairs > index && (
            <div className="h-[1px] w-[4.6rem] bg-neutral-700"></div>
          )}

          <button
            key={pair[1]}
            onClick={() => {
              setMeaning(pair[1]);
            }}
            disabled={selectedPairs > index}
            className={`${
              meaning === pair[1]
                ? "border-neutral-600 bg-neutral-700"
                : "border-neutral-700 bg-neutral-800"
            } w-full flex items-center justify-center px-6 border border-b-4 py-3.5 rounded-xl transition-all active:border active:mt-[3px]`}
          >
            <div>{pair[1]}</div>
          </button>
        </div>
      ))}
    </div>
  );
}
