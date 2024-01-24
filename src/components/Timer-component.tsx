import { useEffect } from "react";
import { useQuest } from "../context/QuizContext";

export default function Timer() {
  const { state, dispatch } = useQuest();
  const { secondsRemaining } = state;
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "tickTock" }), 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
