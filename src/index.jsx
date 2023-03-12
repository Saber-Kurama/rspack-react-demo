import { answer } from "./answer";
import React from "react";
import ReactDOM from "react-dom/client";
import TestDemo from "./TestDemo";

const App = () => {
  return (
    <div>
      the answer to the universe is {answer}
      <TestDemo />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
