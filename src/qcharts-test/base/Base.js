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
  dispatchEvent(event, obj = emptyObject()) {
    super.dispatchEvent(event, obj);
  }
  defaultAttrs() {
    return emptyObject();
  }
  defaultStyles() {
    return emptyObject();
  }
  baseAttrs() {
    let attrs = {
      //动画类型
      animation: {
        use: true,
        duration: 700,
        useTween: true,
        easing: "bounceOut",
      },
      //位置布局信息
      clientRect: {
        left: "10%",
        top: "10%",
        right: "10%",
        bottom: "10%",
        width: undefined,
        height: undefined,
      },
      //透明度
      opacity: 1,
      layer: "default",
      layoutBy: "rows", //按照哪个数据布局 ['rows','cols']
    };
    return attrs;
  }
  style() {
    return this;
  }
}

export default Base;
