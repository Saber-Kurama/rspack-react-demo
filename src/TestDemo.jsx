import { createRef, useEffect } from "react";
// import { Scene, Label } from "spritejs";
import { Scene, Label } from "./spritejs-test/index";

export default () => {
  const domRef = createRef();
  useEffect(() => {
    console.log(domRef);
    const scene = new Scene({
      container: domRef.current,
      width: 3080,
      height: 800,
      mode: "stickyTop",
    });
    const layer = scene.layer();
    const box = new Label({
      text: "SpriteJS",
      fontSize: "2rem",
      anchor: [0.5, 0.5],
      pos: [300, 180],
      bgcolor: "white",
      borderWidth: 1,
      padding: 25,
    });
    layer.append(box);

    // const robot = new Sprite(
    //   "https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png"
    // );

    // robot.attr({
    //   anchor: [0, 0.5],
    //   pos: [0, 0],
    // });

    // robot.animate(
    //   [
    //     { pos: [0, 0] },
    //     { pos: [0, 300] },
    //     { pos: [2700, 300] },
    //     { pos: [2700, 0] },
    //   ],
    //   {
    //     duration: 5000,
    //     iterations: Infinity,
    //     direction: "alternate",
    //   }
    // );

    // layer.append(robot);
  }, []);

  return <div ref={domRef} style={{ height: "300px" }}></div>;
};
