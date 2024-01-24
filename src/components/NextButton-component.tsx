import { useQuest } from "../context/QuizContext";

export default function NextButton() {
  const { state, dispatch } = useQuest();
  const { numberOfQuestions, answer, index } = state;
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
        <button className="btn btn-ui" disabled>
          Waiting for answer...
        </button>
      )}
    </div>
  );
}
