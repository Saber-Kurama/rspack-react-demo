import ownerDocument from "../document";
import Node from "./node";

export default class Block extends Node {
  constructor(attrs = {}) {
    super(attrs);
  }
}

ownerDocument.registerNode(Block, "block");
