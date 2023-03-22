import { answer } from "./answer";
import React from "react";
import ReactDOM from "react-dom/client";
import TestDemo1 from "./TestDemo1";
import TestDemo2 from "./TestDemo2";
import TestDemo from "./TestDemo";
// import TestDemo3 from "./TestDemo3";
// import D3Demo1 from "./D3Demo1";
// import BarChart from "./D3Demo2";
import D3Demo3 from "./D3Demo3";

const data = [
  { label: "A", value: 10 },
  { label: "B", value: 20 },
  { label: "C", value: 30 },
  { label: "D", value: 40 },
];
const App = () => {
  return (
    <div>
      the answer to the universe is {answer}
      {/* <TestDemo /> */}
      {/* <D3Demo1 /> */}
      {/* <BarChart data={data} width={400} height={300} /> */}
      <D3Demo3 />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
