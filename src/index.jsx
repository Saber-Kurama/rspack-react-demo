import { answer } from "./answer";
import React from "react";
import ReactDOM from "react-dom/client";
import TestDemo1 from "./TestDemo1";
import TestDemo2 from "./TestDemo2";
import TestDemo from "./TestDemo";
import TestDemo3 from "./TestDemo3";

const App = () => {
  return (
    <div>
      the answer to the universe is {answer}
      {/* <TestDemo /> */}
      <TestDemo3 />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
