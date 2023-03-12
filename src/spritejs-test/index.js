import { ENV } from "@mesh.js/core";

import Node from "./node/node";
import Label from "./node/label";
import Scene from "./node/scene";
import ownerDocument from "./document";

export const version = "3.8.3";

const createElement = ownerDocument.createElement;
const isSpriteNode = ownerDocument.isSpriteNode;
const registerNode = ownerDocument.registerNode;

export { Node, Scene, Label, createElement, isSpriteNode, registerNode, ENV };
