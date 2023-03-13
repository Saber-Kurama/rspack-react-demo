import { Node } from "spritejs";
import {
  emptyObject,
  deepObjectMerge,
  jsType,
  getDistancePx,
  throttle,
} from "@qcharts/utils";
import { lifeCycle, mixin } from "./mixin";

// 定义个Base 继承  Node
class Base extends Node {
  constructor(attrs) {
    super();
    this.dispatchEvent(lifeCycle.beforeCreate);
    mixin(this);
    this["__store"] = emptyObject();
  }

  get renderAttrs() {
    //attrs转换
    let attrs = deepObjectMerge(
      {},
      this.baseAttrs(),
      this.defaultAttrs(),
      this.theme.attrs,
      this.attr()
    );
    // let { animation, clientRect } = attrs;
    // //动画数据转换
    // if (jsType(animation) === "boolean") {
    //   animation = { use: animation ? true : false };
    // }
    // //处理layer支持多layer
    // const rect = isWeiXin()
    //   ? this.layer.canvas
    //   : this.layer.canvas.getBoundingClientRect();
    // const { width, height } = rect;
    // //计算布局数据
    // for (let key in clientRect) {
    //   if (["left", "right", "width"].indexOf(key) !== -1) {
    //     clientRect[key] = getDistancePx(clientRect[key], width);
    //   } else if (["top", "bottom", "height"].indexOf(key) !== -1) {
    //     clientRect[key] = getDistancePx(clientRect[key], height);
    //   }
    // }
    // if (clientRect.width === undefined) {
    //   clientRect.width = width - clientRect.left - clientRect.right;
    // } else {
    //   clientRect.right = width - clientRect.left - clientRect.width;
    // }
    // if (clientRect.height === undefined) {
    //   clientRect.height = height - clientRect.top - clientRect.bottom;
    // } else {
    //   clientRect.bottom = height - clientRect.top - clientRect.height;
    // }
    // attrs.colors = this.theme.colors;
    // return attrs;
  }

  created() {
    //初始化创建的时候执行
    let store = this["__store"];
    this.dispatchEvent(lifeCycle.created);
    store.__vnode__ = this.render(this.beforeRender({ type: "create" }));
    // const patches = diff(null, store.__vnode__);
    // this.dispatchEvent(lifeCycle.beforeRender);
    // patch.bind(this)(this.$el || this.layer, patches, 1);
    // this.dispatchEvent(lifeCycle.rendered);
    // this.rendered();
    // store.__isCreated__ = true;
    // this.dataset.on("change", (_) => {
    //   this.__update({ type: "state" });
    // });
  }
  beforeRender() {
    //图表初始化准备数据
    return this.renderAttrs;
  }

  render() {
    console.warn("this function must be rewrited");
  }
  style() {
    return this;
  }
}

export default Base;
