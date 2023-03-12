import Base from "../../base/BasePlugin";
import { Group, Label, Polyline, Node } from "spritejs";
import { emptyObject } from "@qcharts/utils";
import filterClone from "filter-clone";

class Axis extends Base {
  constructor(attrs) {
    super(attrs);
    this.renderAxis = emptyObject();
  }
}
export default Axis;
