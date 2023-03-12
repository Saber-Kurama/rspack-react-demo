const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.jsx",
  },
  builtins: {
    html: [{ template: "./src/index.html" }],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
