import ownerDocument from "../document";
import Layer from "./layer";
import Group from "./group";

const _enteredTargets = Symbol("enteredTargets");

function setViewport(options, canvas) {
  if (canvas && canvas.style) {
    let { width, height, mode, container } = options;
    const { clientWidth, clientHeight } = container;

    width = width || clientWidth;
    height = height || clientHeight;

    if (mode === "static") {
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // canvas.style.top = '50%';
      // canvas.style.left = '50%';
      // canvas.style.transform = 'translate(-50%, -50%)';
      // canvas.style.webkitTransform = 'translate(-50%, -50%)';
    } else {
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      canvas.style.transform = "";
      canvas.style.webkitTransform = "";
    }
  }
}

export default class Scene extends Group {
  constructor(options = {}) {
    super();
    if (!options.container) {
      if (typeof ENV.Container === "function") {
        options.container = new ENV.Container(
          options.width || 300,
          options.height || 150
        );
      } else {
        throw new Error("No container specified.");
      }
    }
    this.container = options.container;
    if (this.container.style) {
      if (!this.container.style.overflow) {
        this.container.style.overflow = "hidden";
      }
      if (!this.container.style.position) {
        this.container.style.position = "relative";
      }
    }

    this.options = options;
    options.displayRatio = options.displayRatio || 1.0;
    options.mode = options.mode || "scale";

    options.left = 0;
    options.top = 0;
    options.autoResize = options.autoResize !== false;

    if (options.autoResize) {
      let self; // cross platform
      if (typeof globalThis !== "undefined") {
        self = globalThis;
      } else {
        self = typeof window !== "undefined" ? window : global;
      }

      if (self.addEventListener) {
        const that = this;
        self.addEventListener("resize", function listener() {
          if (
            typeof document !== "undefined" &&
            document.contains(that.container)
          ) {
            // that.resize();
          } else {
            self.removeEventListener("resize", listener);
          }
        });
      }
    }

    this[_enteredTargets] = new Set();
    this.setResolution(options);
    // delegateEvents(this);

    // this[_offscreenLayerCount] = 0;
  }

  /* override */
  appendChild(layer) {
    if (!(layer instanceof Layer) && !(layer instanceof LayerWorker)) {
      wrapLayer(layer);
    }
    const ret = super.appendChild(layer);
    const canvas = layer.canvas;
    if (!layer.offscreen) {
      this.container.appendChild(canvas);
    } else {
      this[_offscreenLayerCount]++;
    }
    setViewport(this.options, canvas);
    layer.setResolution(this.getResolution());
    return ret;
  }
  /* override */
  forceUpdate() {
    if (this.hasOffscreenCanvas && !this._requestID) {
      this._requestID = requestAnimationFrame(() => {
        delete this._requestID;
        this.render();
      });
    }
  }
  layer(id = "default", options = {}) {
    options = Object.assign({}, this.options, options);
    options.id = id;
    const layers = this.orderedChildren;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].id === id) return layers[i];
    }

    const worker = options.worker;
    let layer;

    if (worker) {
      layer = new LayerWorker(options);
    } else {
      layer = new Layer(options);
      // layer.id = id;
    }

    this.appendChild(layer);
    return layer;
  }

  /* override */
  removeChild(layer) {
    const ret = super.removeChild(layer);
    if (ret) {
      if (layer._prepareRenderFinished) layer._prepareRenderFinished();
      const canvas = layer.canvas;
      if (canvas && canvas.remove) canvas.remove();
      if (layer.offscreen) this[_offscreenLayerCount]--;
    }
    return ret;
  }
  /* override */
  setResolution({ width, height } = {}) {
    const container = this.container;
    const { clientWidth, clientHeight } = container;
    if (width == null || height == null) {
      width = width == null ? clientWidth : width;
      height = height == null ? clientHeight : height;
    }

    const { mode, displayRatio } = this.options;
    width *= displayRatio;
    height *= displayRatio;

    this.options.left = 0;
    this.options.top = 0;

    if (
      mode === "stickyHeight" ||
      mode === "stickyLeft" ||
      mode === "stickyRight"
    ) {
      const w = width;
      width = (clientWidth * height) / clientHeight;
      if (mode === "stickyHeight") this.options.left = 0.5 * (width - w);
      if (mode === "stickyRight") this.options.left = width - w;
    } else if (
      mode === "stickyWidth" ||
      mode === "stickyTop" ||
      mode === "stickyBottom"
    ) {
      const h = height;
      height = (clientHeight * width) / clientWidth;
      if (mode === "stickyWidth") this.options.top = 0.5 * (height - h);
      if (mode === "stickyBottom") this.options.top = height - h;
    }

    // super.setResolution({ width, height });
  }
}

ownerDocument.registerNode(Scene, "scene");
