import { useEffect, createRef } from "react";
import * as d3 from "d3";

export default () => {
  function drawChart() {
    // 创建SVG元素
    // var svg = d3
    //   .select("body")
    //   .append("svg")
    //   .attr("width", 600)
    //   .attr("height", 400);
    shap_values;
    const svg = d3.select("svg");
    // 定义颜色比例尺
    var colorScale = d3
      .scaleLinear()
      .domain([-1, 0, 1])
      .range(["#FF0000", "#FFFFFF", "#00FF00"]);

    // 定义x轴比例尺
    var xScale = d3.scaleLinear().domain([-1, 1]).range([0, 500]);

    // 创建x轴
    var xAxis = d3.axisBottom(xScale);

    // 添加x轴
    svg.append("g").attr("transform", "translate(50, 350)").call(xAxis);

    // 创建一个组元素来存储特征
    var featureGroup = svg.append("g").attr("transform", "translate(50, 50)");

    // 定义特征名称
    var featureNames = [
      "age",
      "workclass_?",
      "workclass_Federal-gov",
      "workclass_Local-gov",
      "workclass_Never-worked",
      "workclass_Private",
      "workclass_Self-emp-inc",
      "workclass_Self-emp-not-inc",
      "workclass_State-gov",
      "workclass_Without-pay",
      "education_10th",
      "education_11th",
      "education_12th",
      "education_1st-4th",
      "education_5th-6th",
      "education_7th-8th",
      "education_9th",
      "education_Assoc-acdm",
      "education_Assoc-voc",
      "education_Bachelors",
      "education_Doctorate",
      "education_HS-grad",
      "education_Masters",
      "education_Preschool",
      "education_Prof-school",
      "education_Some-college",
      "marital-status_Divorced",
      "marital-status_Married-AF-spouse",
      "marital-status_Married-civ-spouse",
      "marital-status_Married-spouse-absent",
      "marital-status_Never-married",
      "marital-status_Separated",
      "marital-status_Widowed",
      "occupation_?",
      "occupation_Adm-clerical",
      "occupation_Armed-Forces",
      "occupation_Craft-repair",
      "occupation_Exec-managerial",
      "occupation_Farming-fishing",
      "occupation_Handlers-cleaners",
      "occupation_Machine-op-inspct",
      "occupation_Other-service",
      "occupation_Priv-house-serv",
      "occupation_Prof-specialty",
      "occupation_Protective-serv",
      "occupation_Sales",
      "occupation_Tech-support",
      "occupation_Transport-moving",
      "relationship_Husband",
      "relationship_Not-in-family",
      "relationship_Other-relative",
      "relationship_Own-child",
      "relationship_Unmarried",
      "relationship_Wife",
      "race_Amer-Indian-Eskimo",
      "race_Asian-Pac-Islander",
      "race_Black",
      "race_Other",
      "race_White",
      "sex_Female",
      "sex_Male",
      "capital-gain",
      "capital-loss",
      "hours-per-week",
    ];

    // 创建一个组元素来存储每个特征的条形图
    var featureBarsGroup = featureGroup
      .selectAll("g")
      .data(featureNames)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(0, " + i * 20 + ")";
      });

    // 创建每个特征的条形图
    featureBarsGroup
      .append("rect")
      .attr("width", function (d) {
        return Math.abs(xScale(shap_values[0][d]));
      })
      .attr("height", 10)
      .attr("fill", function (d) {
        return colorScale(shap_values[0][d]);
      });

    // 添加特征名称标签
    featureBarsGroup
      .append("text")
      .text(function (d) {
        return d;
      })
      .attr("x", -50)
      .attr("y", 10)
      .attr("text-anchor", "end");

    // 添加交互效果
    featureBarsGroup
      .on("mouseover", function (d) {
        d3.select(this)
          .select("rect")
          .transition()
          .duration(200)
          .attr("fill", "#FFA500");
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .select("rect")
          .transition()
          .duration(200)
          .attr("fill", function (d) {
            return colorScale(shap_values[0][d]);
          });
      });
  }
  useEffect(() => {
    drawChart();
  }, []);
  return <svg width="400" height="300"></svg>;
};
