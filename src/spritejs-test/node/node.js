import ownerDocument from "../document";

const changedAttrs = Symbol.for("spritejs_changedAttrs");
const attributes = Symbol.for("spritejs_attributes");

const _resolution = Symbol("resolution");
const _animations = Symbol("animations");

const _eventListeners = Symbol("eventListeners");
const _captureEventListeners = Symbol("captureEventListeners");
const _filters = Symbol("filters");
const _display = Symbol("display");

const _program = Symbol("program");
const _shaderAttrs = Symbol("shaderAttrs");
const _uniforms = Symbol("uniforms");

export default class Node {
  constructor(attrs = {}) {
    // this.attributes = new this.constructor.Attr(this);
    this.attributes = {}; // xiugaide
    this[_resolution] = { width: 300, height: 150 };
    Object.assign(this.attributes, attrs);
    // if(Object.seal) {
    //   Object.seal(this.attributes);
    // }
    this[_animations] = new Set();
    this[_eventListeners] = {};
    this[_captureEventListeners] = {};
  }
  connect(parent, zOrder) {
    Object.defineProperty(this, "parent", {
      value: parent,
      writable: false,
      configurable: true,
    });
    Object.defineProperty(this, "zOrder", {
      value: zOrder,
      writable: false,
      configurable: true,
    });
    if (parent.timeline) this.activateAnimations();
    this.setResolution(parent.getResolution());
    this.forceUpdate();
    // this.dispatchEvent({ type: "append", detail: { parent, zOrder } });
  }
  draw(meshes = []) {
    const mesh = this.mesh;

    if (mesh) {
      applyFilters(mesh, this.filters);
      meshes.push(mesh);
      if (this[_program]) {
        mesh.setProgram(this[_program]);
        const shaderAttrs = this[_shaderAttrs];
        if (shaderAttrs) {
          Object.entries(shaderAttrs).forEach(([key, setter]) => {
            mesh.setAttribute(key, setter);
          });
        }
        const uniforms = this[_uniforms];
        if (this[_uniforms]) {
          const _uniform = {};
          Object.entries(uniforms).forEach(([key, value]) => {
            if (typeof value === "function") {
              value = value(this, key);
            }
            _uniform[key] = value;
          });
          mesh.setUniforms(_uniform);
        }
      }
      applyRenderEvent(this, mesh);
    }
    return meshes;
  }

  forceUpdate() {
    if (this.parent) this.parent.forceUpdate();
  }
  getResolution() {
    return { ...this[_resolution] };
  }
  setResolution({ width, height }) {
    // const { width: w, height: h } = this[_resolution];
    // if (w !== width || h !== height) {
    //   this[_resolution] = { width, height };
    //   // this.updateContours();
    //   this.forceUpdate();
    //   this.dispatchEvent({
    //     type: "resolutionchange",
    //     detail: { width, height },
    //   });
    // }
  }

  remove() {
    if (this.parent && this.parent.removeChild) {
      this.parent.removeChild(this);
      return true;
    }
    return false;
  }
}

ownerDocument.registerNode(Node, "node");
