import ownerDocument from "../document";
import Node from "./node";

const _mesh = Symbol("mesh");
export default class Block extends Node {
  constructor(attrs = {}) {
    super(attrs);
  }

  get mesh() {
    if (this.attributes.display === "none") return null;
    const box = this.clientBox;
    if (box) {
      let mesh = this[_mesh];
      if (!mesh) {
        mesh = new Mesh2D(box);
        mesh.box = box;
        const fillColor = this.attributes.bgcolor;
        setFillColor(mesh, { color: fillColor });
        if (this.hasBorder) {
          const { borderColor, borderWidth, borderDash, borderDashOffset } =
            this.attributes;
          setStrokeColor(mesh, {
            color: borderColor,
            lineWidth: borderWidth,
            lineDash: borderDash,
            lineDashOffset: borderDashOffset,
          });
        }
        // mesh.setOpacity(this.attributes.opacity);
        this[_mesh] = mesh;
        const clipPath = this.attributes.clipPath;
        if (clipPath) {
          this[_mesh].setClipPath(clipPath);
        }
      } else if (mesh.box !== box) {
        mesh.contours = box.contours;
        mesh.box = box;
      }
      const opacity = this.opacity;
      if (mesh.getOpacity() !== opacity) {
        mesh.setOpacity(opacity);
      }
      mesh.setTransform(...this.renderMatrix);
      return mesh;
    }
    return null;
  }
}

ownerDocument.registerNode(Block, "block");
