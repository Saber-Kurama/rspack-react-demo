import Attr from "../attribute/node";
// import Animation from "../animation";
import ownerDocument from "../document";

export default class Node {
  static Attr = Attr;
}
// 注册 节点 Node
ownerDocument.registerNode(Node, "node");
