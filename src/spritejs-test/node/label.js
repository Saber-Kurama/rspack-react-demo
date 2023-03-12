import Block from "./block";
import ownerDocument from "../document";

export default class Label extends Block {}

ownerDocument.registerNode(Label, "label");
