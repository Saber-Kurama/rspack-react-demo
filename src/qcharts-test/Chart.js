import Base from "./base/Base";
import { Scene } from "spritejs";
import { jsType, emptyObject, throttle } from "@qcharts/utils";

class Chart extends Base {
  constructor(attr) {
    super();
    let { container, contextType = "2d", displayRatio } = attr;
    this.$el = container;
    this.plugins = [];
    this.children = [];
    this.scene = new Scene({
      container,
      contextType,
      displayRatio: displayRatio,
    });
  }
}

export default Chart;
