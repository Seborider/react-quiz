import { ProgressBarProps } from "../types/props";

export default function ProgressBar({
  index,
  numberOfQuestions,
  points,
  maxPossiblePoints,
  answer,
}: ProgressBarProps) {
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
