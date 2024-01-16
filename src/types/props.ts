import { AppAction } from "./types";
import { Dispatch, ReactNode } from "react";

export interface StartScreeProps {
  numberOfQuestions: number;
  dispatch: Dispatch<AppAction>;
}

export interface QuestionProps {
  question: any;
  dispatch: Dispatch<AppAction>;
  answer: unknown;
}

export interface OptionProps {
  question: any;
  dispatch: Dispatch<AppAction>;
  answer: unknown;
}

export interface NextButtonProps {
  dispatch: Dispatch<AppAction>;
  answer: unknown;
  numberOfQuestions: number;
  index: number;
}

export interface ProgressBarProps {
  numberOfQuestions: number;
  index: number;
  points: number;
  maxPossiblePoints: number;
  answer: unknown;
}

export interface FinishedScreenProps {
  maxPossiblePoints: number;
  points: number;
  highscore: number;
  dispatch: Dispatch<AppAction>;
}

export interface FooterProps {
  children: ReactNode;
}

export interface TimerProps {
  dispatch: Dispatch<AppAction>;
  secondsRemaining: number;
}
