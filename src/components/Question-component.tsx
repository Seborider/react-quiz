import Option from "./Options-components";
import { useQuest } from "../context/QuizContext";

export default function Question() {
  const { state } = useQuest();
  const question = state.question;
  return (
    <div>
      <h4>{question?.question}</h4>
      <Option />
    </div>
  );
}
