export type AppState = {
  questions: any[];
  status: "loading" | "ready" | "error" | "active" | "finished" | "restart";
  index: number;
  answer: null | unknown;
  points: number;
  highScore: number;
  secondsRemaining: number | null;
};

export type AppAction =
  | { type: "dataReceived"; payload: any[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finished" }
  | { type: "restart" }
  | { type: "tickTock" };
