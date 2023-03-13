import { answer } from "./answer";
import React from "react";
import ReactDOM from "react-dom/client";
import TestDemo1 from "./TestDemo1";
import TestDemo2 from "./TestDemo2";
import TestDemo from "./TestDemo";

const App = () => {
  return (
    <div>
      the answer to the universe is {answer}
      {/* <TestDemo /> */}
      <TestDemo2 />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
