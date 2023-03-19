import { useEffect, createRef } from "react";
import { Scene, Path, Label, Group, Polyline } from "spritejs";
import { Histogram } from "@d3/histogram";
import { StackedBarChart } from "@d3/diverging-stacked-bar-chart";

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
    const scene = new Scene({
      container: domRef.current,
      width: 1600,
      height: 1600,
      mode: "stickyTop",
    });
    const layer = scene.layer();

    const axiosGroup = new Group();
    axiosGroup.attr({ pos: [0, 0], size: [1600, 1600], bgcolor: "#fff" });
    const polyline1 = new Polyline({
      strokeColor: "red",
      lineWidth: 1,
      pos: [0, 50],
      points: [
        [0, 0],
        [1600, 0],
      ],
      // animation: {
      //   form: [0, 10],
      //   to: [300, 10],
      // },
    });
    axiosGroup.append(polyline1);
    layer.append(axiosGroup);
    const text1 = new Label("SpriteJS.org");
    console.log("text1", text1);
    layer.append(text1);
    const path = new Path(
      "M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z"
    );

    const rect = path.originalContentRect;

    path.attr({
      anchor: [0.5, 0.5],
      pos: [800 - rect[2] / 2, 800 - rect[3] / 2],
      fillColor: "red",
    });

    layer.append(path);

    chart = StackedBarChart(politifact, {
      x: (d) => d.proportion,
      y: (d) => d.speaker,
      z: (d) => d.ruling,
      xFormat: "+%",
      xLabel: "← more lies · Truthiness · more truths →",
      yDomain: d3.groupSort(
        politifact,
        (D) => d3.sum(D, (d) => -Math.min(0, d.proportion)),
        (d) => d.speaker
      ),
      zDomain: politifact.rulings,
      colors: d3.schemeSpectral[politifact.rulings.length],
      width,
      marginLeft: 70,
    });

    function StackedBarChart(
      data,
      {
        x = (d) => d, // given d in data, returns the (quantitative) x-value
        y = (d, i) => i, // given d in data, returns the (ordinal) y-value
        z = () => 1, // given d in data, returns the (categorical) z-value
        title, // given d in data, returns the title text
        marginTop = 30, // top margin, in pixels
        marginRight = 0, // right margin, in pixels
        marginBottom = 0, // bottom margin, in pixels
        marginLeft = 40, // left margin, in pixels
        width = 640, // outer width, in pixels
        height, // outer height, in pixels
        xType = d3.scaleLinear, // type of x-scale
        xDomain, // [xmin, xmax]
        xRange = [marginLeft, width - marginRight], // [left, right]
        yDomain, // array of y-values
        yRange, // [bottom, top]
        yPadding = 0.1, // amount of y-range to reserve to separate bars
        zDomain, // array of z-values
        offset = d3.stackOffsetDiverging, // stack offset method
        order = (series) => {
          // stack order method; try also d3.stackOffsetNone
          return [
            // by default, stack negative series in reverse order
            ...series
              .map((S, i) => (S.some(([, y]) => y < 0) ? i : null))
              .reverse(),
            ...series.map((S, i) => (S.some(([, y]) => y < 0) ? null : i)),
          ].filter((i) => i !== null);
        },
        xFormat, // a format specifier string for the x-axis
        xLabel, // a label for the x-axis
        colors = d3.schemeTableau10, // array of colors
      } = {}
    ) {
      // Compute values.
      const X = d3.map(data, x);
      const Y = d3.map(data, y);
      const Z = d3.map(data, z);

      // Compute default y- and z-domains, and unique them.
      if (yDomain === undefined) yDomain = Y;
      if (zDomain === undefined) zDomain = Z;
      yDomain = new d3.InternSet(yDomain);
      zDomain = new d3.InternSet(zDomain);

      // Omit any data not present in the y- and z-domains.
      const I = d3
        .range(X.length)
        .filter((i) => yDomain.has(Y[i]) && zDomain.has(Z[i]));

      // If the height is not specified, derive it from the y-domain.
      if (height === undefined)
        height = yDomain.size * 25 + marginTop + marginBottom;
      if (yRange === undefined) yRange = [height - marginBottom, marginTop];

      // Compute a nested array of series where each series is [[x1, x2], [x1, x2],
      // [x1, x2], …] representing the x-extent of each stacked rect. In addition,
      // each tuple has an i (index) property so that we can refer back to the
      // original data point (data[i]). This code assumes that there is only one
      // data point for a given unique y- and z-value.
      const series = d3
        .stack()
        .keys(zDomain)
        .value(([, I], z) => X[I.get(z)])
        .order(order)
        .offset(offset)(
          d3.rollup(
            I,
            ([i]) => i,
            (i) => Y[i],
            (i) => Z[i]
          )
        )
        .map((s) =>
          s.map((d) => Object.assign(d, { i: d.data[1].get(s.key) }))
        );

      // Compute the default y-domain. Note: diverging stacks can be negative.
      if (xDomain === undefined) xDomain = d3.extent(series.flat(2));

      // Construct scales, axes, and formats.
      const xScale = xType(xDomain, xRange);
      const yScale = d3.scaleBand(yDomain, yRange).paddingInner(yPadding);
      const color = d3.scaleOrdinal(zDomain, colors);
      const xAxis = d3.axisTop(xScale).ticks(width / 80, xFormat);
      const yAxis = d3.axisLeft(yScale).tickSize(0);

      // Compute titles.
      if (title === undefined) {
        const formatValue = xScale.tickFormat(100, xFormat);
        title = (i) => `${Y[i]}\n${Z[i]}\n${formatValue(X[i])}`;
      } else {
        const O = d3.map(data, (d) => d);
        const T = title;
        title = (i) => T(O[i], i, data);
      }

      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

      svg
        .append("g")
        .attr("transform", `translate(0,${marginTop})`)
        .call(xAxis)
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("y2", height - marginTop - marginBottom)
            .attr("stroke-opacity", 0.1)
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", xScale(0))
            .attr("y", -22)
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .text(xLabel)
        );

      const bar = svg
        .append("g")
        .selectAll("g")
        .data(series)
        .join("g")
        .attr("fill", ([{ i }]) => color(Z[i]))
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("x", ([x1, x2]) => Math.min(xScale(x1), xScale(x2)))
        .attr("y", ({ i }) => yScale(Y[i]))
        .attr("width", ([x1, x2]) => Math.abs(xScale(x1) - xScale(x2)))
        .attr("height", yScale.bandwidth());

      if (title) bar.append("title").text(({ i }) => title(i));

      svg
        .append("g")
        .attr("transform", `translate(${xScale(0)},0)`)
        .call(yAxis)
        .call((g) =>
          g
            .selectAll(".tick text")
            .attr("dx", -3)
            .attr("x", (y) => {
              // Find the minimum x-value for the corresponding y-value.
              const x = d3.min(series, (S) => S.find((d) => Y[d.i] === y)?.[0]);
              return xScale(x) - xScale(0);
            })
        );

      return Object.assign(svg.node(), { scales: { color } });
    }
  }, []);

  return <div ref={domRef} style={{ height: "300px" }}></div>;
};
