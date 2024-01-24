import { useQuest } from "../context/QuizContext";

export default function StartScreen() {
  const { state, dispatch } = useQuest();
  const { numberOfQuestions } = state;
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numberOfQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start!
      </button>
    </div>
  );
}
