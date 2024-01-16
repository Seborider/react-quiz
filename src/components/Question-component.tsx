import { QuestionProps } from "../types/props";
import Option from "./Options-components";

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
