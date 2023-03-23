import { useEffect, createRef } from "react";
import * as d3 from "d3";

export default () => {
  function drawChart() {
    const barData = [45, 67, 96, 84, 41];
    const svg = d3
      .select("svg")
      .selectAll("rect")
      .data(barData)
      .enter()
      .append("rect")
      // calculate x-position based on its index
      .attr("x", (d, i) => i * rectWidth)
      // set height based on the bound datum
      .attr("height", (d) => d)
      // rest of attributes are constant values
      .attr("width", rectWidth)
      .attr("stroke-width", 3)
      .attr("stroke", "plum")
      .attr("fill", "pink");
  }
  useEffect(() => {
    drawChart();
  }, []);
  return <svg width="400" height="300"></svg>;
};
