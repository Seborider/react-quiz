import React, { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header-component";
import Main from "./components/Main-component";
import { AppAction, AppState } from "./types/types";
import Loader from "./components/Loader-component";
import ErrorFetching from "./components/Error-component";
import StartScreen from "./components/StartScreen-component";
import Question from "./components/Question-component";
import NextButton from "./components/NextButton-component";
import ProgressBar from "./components/ProgressBar-component";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer-component";
import Timer from "./components/Timer-component";

const SECONDS_PER_QUESTION = 30;

const initialState: AppState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
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
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
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

function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions: number = questions.length;
  const maxPossiblePoints: number = questions.reduce(
    (prev, curr) => prev + curr.points,
    0,
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions").then((res) =>
      res
        .json()
        .then((data) => {
          dispatch({ type: "dataReceived", payload: data });
        })
        .catch(() => dispatch({ type: "dataFailed" })),
    );
  }, []);
  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorFetching />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              numberOfQuestions={numberOfQuestions}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={Number(secondsRemaining)}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numberOfQuestions={numberOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
