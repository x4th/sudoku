import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";

type AppState = {
  errorMessage: string;
  validate: boolean;
  finished: boolean;
};

function App() {
  let [state, setState] = useState<AppState>({
    errorMessage: "",
    validate: false,
    finished: false,
  });

  function setValidate(v: boolean) {
    setState((state) => ({
      ...state,
      validate: v,
    }));
  }

  function setErrorMessage(msg: string) {
    setState((state) => ({
      ...state,
      errorMessage: msg,
    }));
  }

  function setFinished(finished: boolean) {
    setState((state) => ({
      ...state,
      finished,
    }));
  }

  return (
    <div className="App">
      <Board
        validate={state.validate}
        setValidate={setValidate}
        setFinished={setFinished}
        setErrorMessage={setErrorMessage}
      />
      <button className="validateButton" onClick={() => setValidate(true)}>
        Check answers
      </button>
      {state.errorMessage ? (
        <div className="error">{state.errorMessage}</div>
      ) : null}
      {state.finished && !state.validate ? (
        <div className="done">Completed!</div>
      ) : null}
    </div>
  );
}

export default App;
