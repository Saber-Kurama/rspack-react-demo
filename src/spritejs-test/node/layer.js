import { Renderer, ENV, Figure2D, Mesh2D } from "@mesh.js/core";
import Group from "./group";
import ownerDocument from "../document";

const defaultOptions = {
  antialias: true,
  autoRender: true,
  alpha: true, // for wx-miniprogram
};

const _autoRender = Symbol("autoRender");
const _renderer = Symbol("renderer");
const _timeline = Symbol("timeline");

const _prepareRender = Symbol("prepareRender");
const _tickRender = Symbol("tickRender");

const _pass = Symbol("pass");
const _fbo = Symbol("fbo");
const _tickers = Symbol("tickers");

const _layerTransformInvert = Symbol("layerTransformInvert");

export default class Layer extends Group {
  constructor(options = {}) {
    super();
    // 没有 canvas
    if (!options.canvas) {
      const { width, height } = this.getResolution();
      const canvas = ENV.createCanvas(width, height, {
        offscreen: !!options.offscreen,
        id: options.id,
        extra: options.extra,
      });
      if (canvas.style) canvas.style.position = "absolute";
      if (canvas.dataset) canvas.dataset.layerId = options.id;
      if (canvas.contextType) options.contextType = canvas.contextType;
      options.canvas = canvas;
    }
    const canvas = options.canvas;
    const opts = Object.assign({}, defaultOptions, options);
    this[_autoRender] = opts.autoRender;
    delete options.autoRender;
    const _Renderer = opts.Renderer || Renderer;
    this[_renderer] = new _Renderer(canvas, opts);
    // if(canvas.__gl__) {
    //   // fix blendFunc for node-canvas-webgl
    //   const gl = canvas.__gl__;
    //   gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // }
    this.options = options;
    this.id = options.id;
    this[_pass] = [];
    // this.setResolution(canvas);
    this.canvas = canvas;
    // this[_timeline] = new Timeline();
    // this.__mouseCapturedTarget = null;
    // this[_layerTransformInvert] = null;
  }
  /* override */
  forceUpdate() {
    if (!this[_prepareRender]) {
      if (this.parent && this.parent.hasOffscreenCanvas) {
        this.parent.forceUpdate();
        let _resolve = null;
        const prepareRender = new Promise((resolve) => {
          _resolve = resolve;
        });
        prepareRender._resolve = _resolve;
        this[_prepareRender] = prepareRender;
      } else {
        let _resolve = null;
        let _requestID = null;
        const prepareRender = new Promise((resolve) => {
          _resolve = resolve;

          if (this[_autoRender]) {
            _requestID = requestAnimationFrame(() => {
              delete prepareRender._requestID;
              this.render();
            });
          }
        });

        prepareRender._resolve = _resolve;
        prepareRender._requestID = _requestID;

        this[_prepareRender] = prepareRender;
      }
    }
  }

  _prepareRenderFinished() {
    if (this[_prepareRender]) {
      if (this[_prepareRender]._requestID) {
        cancelAnimationFrame(this[_prepareRender]._requestID);
      }
      this[_prepareRender]._resolve();
      delete this[_prepareRender];
    }
  }

  render({ clear = true } = {}) {
    const fbo = this[_pass].length ? this.getFBO() : null;
    if (fbo) {
      this.renderer.glRenderer.bindFBO(fbo.target);
    }
    if (clear) this[_renderer].clear();
    const meshes = this.draw();
    console.log("meshes", meshes);
    if (meshes && meshes.length) {
      this.renderer.drawMeshes(meshes);
      if (this.canvas.draw) this.canvas.draw();
    }
    if (fbo) {
      const renderer = this.renderer.glRenderer;
      const len = this[_pass].length;
      const { width, height } = this.getResolution();
      const rect = [
        0,
        0,
        width / this.displayRatio,
        height / this.displayRatio,
      ];
      this[_pass].forEach((pass, idx) => {
        pass.blend = true;
        pass.setTexture(fbo.target.texture, { rect });
        if (idx === len - 1) renderer.bindFBO(null);
        else {
          fbo.swap();
          renderer.bindFBO(fbo.target);
        }
        this[_renderer].clear();
        this.renderer.drawMeshes([pass]);
      });
    }
    this._prepareRenderFinished();
  }

  /* override */
  setResolution({ width, height }) {
    // const renderer = this.renderer;
    // const m =
    //   renderer.__globalTransformMatrix || renderer.globalTransformMatrix;
    // const offsetLeft = m[4];
    // const offsetTop = m[5];
    // const previousDisplayRatio = m[0];
    // const { width: w, height: h } = this.getResolution();
    // if (w !== width || h !== height) {
    //   super.setResolution({ width, height });
    //   if (this.canvas) {
    //     this.canvas.width = width;
    //     this.canvas.height = height;
    //     if (renderer.updateResolution) renderer.updateResolution();
    //   }
    //   this.attributes.size = [width, height];
    //   if (this[_pass].length) {
    //     this[_pass].forEach((pass) => {
    //       const figure = new Figure2D();
    //       figure.rect(
    //         0,
    //         0,
    //         width / this.displayRatio,
    //         height / this.displayRatio
    //       );
    //       pass.contours = figure.contours;
    //     });
    //   }
    //   // this.dispatchEvent({type: 'resolutionchange', width, height});
    // }
    // const [left, top] = this.renderOffset;
    // const displayRatio = this.displayRatio;
    // if (
    //   offsetLeft !== left ||
    //   offsetTop !== top ||
    //   previousDisplayRatio !== displayRatio
    // ) {
    //   // console.log(displayRatio, this.parent);
    //   renderer.setGlobalTransform(displayRatio, 0, 0, displayRatio, left, top);
    //   renderer.__globalTransformMatrix = null;
    //   this[_layerTransformInvert] = null;
    //   this.updateGlobalTransform();
    //   this.forceUpdate();
    // }
  }
}

ownerDocument.registerNode(Layer, "layer");
