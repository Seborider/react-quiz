import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header-component";
import Main from "./components/Main-component";
import Loader from "./components/Loader-component";
import ErrorFetching from "./components/Error-component";
import StartScreen from "./components/StartScreen-component";
import Question from "./components/Question-component";
import NextButton from "./components/NextButton-component";
import ProgressBar from "./components/ProgressBar-component";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer-component";
import Timer from "./components/Timer-component";
import { useQuest } from "./context/QuizContext";

function App() {
  const {
    state: { status },
    dispatch,
  } = useQuest();

  useEffect(() => {
    fetch("http://localhost:9000/questions").then((res) =>
      res
        .json()
        .then((data) => {
          dispatch({ type: "dataReceived", payload: data });
        })
        .catch(() => dispatch({ type: "dataFailed" })),
    );
  }, [dispatch]);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorFetching />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <ProgressBar />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
}

export default App;
