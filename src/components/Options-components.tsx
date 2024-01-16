import { OptionProps } from "../types/props";

export default function Option({ question, dispatch, answer }: OptionProps) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option: string, index: number) => (
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
