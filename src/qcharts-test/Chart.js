import Base from "./base/Base";
import BaseVisual from "./base/BaseVisual";
import BasePlugin from "./base/BasePlugin";
import { Scene } from "spritejs";
import { jsType, emptyObject, throttle } from "@qcharts/utils";

class Chart extends Base {
  constructor(attr) {
    super();
    let { container, contextType = "webgl2", displayRatio } = attr;
    this.$el = container;
    this.plugins = [];
    this.children = [];
    // 创建 场景
    this.scene = new Scene({
      container,
      contextType,
      displayRatio: displayRatio,
    });

    this.checkRender = throttle((_) => {
      this.children.forEach((child) => {
        child.created();
        console.log("abc");
        // this.dataset.addDep(child);
      });
      // this.__store.__isCreated__ = true;
      this.dispatchEvent("updated", emptyObject());
    });
  }

  append(node) {
    // if (!this.dataset) {
    //   console.error("Chart should set data before append some graphs");
    //   return;
    // }
    if (jsType(node) === "array") {
      node.forEach((item) => {
        this.append(item);
      });
      return;
    } else if (node instanceof BaseVisual) {
      this.visuals.push(node);
    } else if (node instanceof BasePlugin) {
      this.plugins.push(node);
    }
    this.children.push(node);
    node.chart = this;
    node.scene = this.scene;
    this.checkRender();
  }
}

export default Chart;
