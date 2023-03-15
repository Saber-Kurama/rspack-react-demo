import { useEffect, createRef } from "react";
import { Scene, Path, Label, Group } from "spritejs";

export default () => {
  const domRef = createRef();
  useEffect(() => {
    const data = [
      { value: 22, label: "05-01" },
      { value: 60, label: "05-02" },
      { value: 56, label: "05-03" },
      { value: 85, label: "05-04" },
      { value: 136, label: "05-05" },
      { value: 108, label: "05-06" },
      { value: 64, label: "05-07" },
      { value: 35, label: "05-08" },
    ];
    const scene = new Scene({
      container: domRef.current,
      width: 1600,
      height: 1600,
      mode: "stickyHeight",
    });
    const layer = scene.layer();

    const axiosGroup = new Group();
    axiosGroup.attr({ pos: [0, 0], size: [300, 300], bgcolor: "#cec" });
    layer.append(axiosGroup);
    const text1 = new Label("SpriteJS.org");
    console.log("text1", text1);
    layer.append(text1);
    const path = new Path(
      "M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z"
    );

    const rect = path.originalContentRect;

    path.attr({
      anchor: [0.5, 0.5],
      pos: [800 - rect[2] / 2, 800 - rect[3] / 2],
      fillColor: "red",
    });

    layer.append(path);
  }, []);

  return <div ref={domRef} style={{ height: "300px" }}></div>;
};
