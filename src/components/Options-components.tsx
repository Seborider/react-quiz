import { useQuest } from "../context/QuizContext";

export default function Option() {
  const { state, dispatch } = useQuest();
  const { question, answer } = state;
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question?.options.map((option: string, index: number) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
