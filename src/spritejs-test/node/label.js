import Block from "./block";
import ownerDocument from "../document";

export default class Label extends Block {
  constructor(attrs = {}) {
    if (typeof attrs === "string") attrs = { text: attrs };
    super(attrs);
  }

  /* override */
  draw(meshes) {
    console.log("?????", meshes);
    super.draw(meshes);
    const mesh = this.mesh;
    if (mesh) {
      const textImage = this[_textImage];
      if (textImage) {
        let texture = mesh.texture;

        if (
          !texture ||
          (this[_textureContext] && this[_textureContext] !== this.renderer) ||
          textImage.needsUpdate
        ) {
          textImage.needsUpdate = false;
          deleteTexture(textImage.image, this.renderer);
          texture = createTexture(textImage.image, this.renderer);
          this[_updateTextureRect] = true;
        } else {
          texture = mesh.uniforms.u_texSampler;
        }

        if (this[_updateTextureRect]) {
          const [width, height] = textImage.rect.slice(2);
          const [w, h] = this.contentSize;
          const textAlign = this.attributes.textAlign;
          const verticalAlign = this.attributes.verticalAlign;

          let x = 0;
          if (textAlign === "center") {
            x = (w - width) / 2;
          } else if (textAlign === "right" || textAlign === "end") {
            x = w - width;
          }

          const fontHeight = this.attributes.fontSize;
          const lineHeight = this.attributes.lineHeight;

          let y = 0; // middle
          if (verticalAlign === "top") {
            y = (fontHeight - lineHeight) / 2;
          } else if (verticalAlign === "bottom") {
            y = (lineHeight - fontHeight) / 2;
          }

          const { paddingLeft, paddingTop } = this.attributes;
          const { borderWidth } = this.attributes;

          x += paddingLeft + borderWidth;
          y += paddingTop + borderWidth;

          const { anchorX, anchorY } = this.attributes;

          x -= this.offsetSize[0] * anchorX;
          y -= this.offsetSize[1] * anchorY;

          mesh.setTexture(texture, {
            rect: [x, y, width, height],
          });
          this[_updateTextureRect] = false;
          this[_textureContext] = this.renderer;
        }
      }
    }
    return meshes;
  }
}

ownerDocument.registerNode(Label, "label");
