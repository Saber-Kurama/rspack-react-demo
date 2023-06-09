import { useEffect, createRef } from "react";
// import qcharts from "@qcharts/core";
import qcharts from "./qcharts-test";

export default () => {
  const domRef = createRef();
  useEffect(() => {
    const data = [
      { value: 22, label: "05-01" },
      { value: 60, label: "05-02" },
      { value: 56, label: "05-03" },
      { value: 85, label: "05-04" },
      { value: 136, label: "05-05" },
      { value: 108, label: "05-06" },
      { value: 64, label: "05-07" },
      { value: 35, label: "05-08" },
    ];
    const { Chart, Axis } = qcharts;
    const chart = new Chart({
      container: domRef.current,
    });
    console.log("chart----", chart);
    // chart.source(data, {
    //   value: "value",
    //   text: "label",
    // });
    // const bar = new Bar({
    //   animation: {
    //     duration: 1000,
    //     easing: "elasticOut",
    //   },
    // });
    // // const tooltip = new Tooltip();
    // // const legend = new Legend();
    const axisBottom = new Axis().style("grid", false);
    console.log("axisBottom", axisBottom);
    // const axisLeft = new Axis({ orient: "left" })
    //   .style("axis", false)
    //   .style("scale", false);
    chart.append([axisBottom]);
    // bar.dataset.on("mouseEvent", function (...params) {
    //   console.log(params);
    // });
  }, []);

  return <div ref={domRef} style={{ height: "300px" }}></div>;
};
