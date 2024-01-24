import { useQuest } from "../context/QuizContext";

export default function ProgressBar() {
  const { state } = useQuest();
  const { numberOfQuestions, index, points, answer, maxPossiblePoints } = state;
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
