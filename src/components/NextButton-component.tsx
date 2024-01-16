import { NextButtonProps } from "../types/props";

export default function NextButton({
  dispatch,
  answer,
  index,
  numberOfQuestions,
}: NextButtonProps) {
  return (
    <div>
      {answer !== null && (
        <>
          {index < numberOfQuestions - 1 && (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "nextQuestion" })}
            >
              Next
            </button>
          )}
          {index === numberOfQuestions - 1 && (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "finished" })}
            >
              Finish
            </button>
          )}
        </>
      )}
      {answer === null && (
        // Placeholder or disabled button when answer is null
        <button className="btn btn-ui" disabled>
          Waiting for answer...
        </button>
      )}
    </div>
  );
}
