import { h, easing } from "@qcharts/vnode";
import Wave from "./visuals/Wave/index";
import Gauge from "./visuals/Gauge";
import Axis from "./plugins/Axis/index";
import Chart from "./Chart";

var version = "1.0.37";
var qcharts = {
  version: version,
  h: h,
  Wave,
  Gauge,
  Axis: Axis,
  Chart: Chart,
  easing: easing,
};
export { version, h, Wave, Gauge, Axis, Chart, easing };
export default qcharts;
