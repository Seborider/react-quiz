import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { AppAction, AppState } from "../types/types";
import { QuizProviderProps } from "../types/props";

const SECONDS_PER_QUESTION = 30;

const initialState: AppState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
  numberOfQuestions: 0,
  maxPossiblePoints: 0,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "dataReceived":
      const maxPoints = action.payload.reduce(
        (total, question) => total + question.points,
        0,
      );
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        numberOfQuestions: action.payload.length,
        question: action.payload[0],
        maxPossiblePoints: maxPoints,
      };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
        question: state.questions[0],
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      const nextIndex = state.index + 1;
      const nextQuestion = state.questions[nextIndex];
      return {
        ...state,
        index: nextIndex,
        question: nextQuestion,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        numberOfQuestions: state.questions.length,
        status: "ready",
        maxPossiblePoints: state.questions.reduce(
          (acc, question) => acc + question.points,
          0,
        ),
      };
    case "tickTock":
      return {
        ...state,
        secondsRemaining: Number(state.secondsRemaining) - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

const QuizContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuest = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuest must be used within a QuizProvider");
  }
  return context;
};

export { QuizProvider, useQuest };
