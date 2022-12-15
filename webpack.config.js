const path = require("path");

var DIST_DIR = path.resolve(__dirname, "client/dist");

module.exports = {
  mode: "development",
  entry: "./index.js",

  output: {
    path: DIST_DIR,
    filename: "bundle.js",
  },

  devServer: {
    port: 3000,
    static: [path.resolve(__dirname, "client")],
    open: true,
    hot: true,
    liveReload: false,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ],
  },
};
