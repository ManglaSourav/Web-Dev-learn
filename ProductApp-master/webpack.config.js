var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    // publicPath: "/",
    filename: "bundle.js"
  },
  // devServer: {
  //   contentBase: "./build"
  // },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  // resolve: {
  //   extensions: ["*", ".js", "*.jsx"]
  // },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html"
    }),
    new ProgressBarPlugin()
  ]
};
