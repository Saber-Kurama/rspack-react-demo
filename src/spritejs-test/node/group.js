import ownerDocument from "../document";
import Block from "./block";

const _zOrder = Symbol("zOrder");

const _ordered = Symbol("ordered");
const _children = Symbol("children");

const _sealed = Symbol("sealed");

export default class Group extends Block {
  constructor(attrs = {}) {
    super(attrs);
    this[_children] = [];
    this[_ordered] = null;
    this[_zOrder] = 0;
  }
  get orderedChildren() {
    if (!this[_ordered]) {
      this[_ordered] = [...this[_children]];
      this[_ordered].sort((a, b) => {
        return a.zIndex - b.zIndex || a.zOrder - b.zOrder;
      });
    }
    return this[_ordered];
  }

  append(...els) {
    return els.map((el) => {
      return this.appendChild(el);
    });
  }

  appendChild(el) {
    el.remove();
    this[_children].push(el);
    el.connect(this, this[_zOrder]++);
    if (this[_ordered]) {
      if (
        this[_ordered].length &&
        el.zIndex < this[_ordered][this[_ordered].length - 1].zIndex
      ) {
        this.reorder();
      } else {
        this[_ordered].push(el);
      }
    }
    return el;
  }

  /* override */
  draw(meshes = []) {
    this.__cacheRenderMatrix = this.renderMatrix;
    super.draw(meshes);
    if (!this[_sealed] && this.attributes.display !== "none") {
      const children = this.orderedChildren;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.draw(meshes);
      }
    }
    this.__cacheRenderMatrix = null;

    return meshes;
  }
  /* override */
  setResolution({ width, height }) {
    super.setResolution({ width, height });
    this[_children].forEach((child) => {
      child.setResolution({ width, height });
    });
  }
}

ownerDocument.registerNode(Group, "group");
