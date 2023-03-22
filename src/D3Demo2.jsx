import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // 清除画布
    context.clearRect(0, 0, width, height);

    // 计算柱状图的尺寸和位置
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([innerHeight, 0]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // 绘制坐标轴
    context.beginPath();
    xAxis(context);
    context.moveTo(margin.left, margin.top);
    context.lineTo(margin.left, height - margin.bottom);
    context.lineTo(width - margin.right, height - margin.bottom);
    context.stroke();

    // 绘制柱状图
    context.fillStyle = "steelblue";
    data.forEach((d) => {
      const x = margin.left + xScale(d.label);
      const y = margin.top + yScale(d.value);
      const barHeight = innerHeight - yScale(d.value);
      context.fillRect(x, y, xScale.bandwidth(), barHeight);
    });
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default BarChart;
