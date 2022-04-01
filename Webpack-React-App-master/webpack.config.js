// Requiring the default path module to access the file location and make changes
//to the file location.
var path = require("path");
// we require the HTMLWebpackPlugin to generate an HTML file to be used for serving
// bundled JavaScript file/files
var HtmlWebpackPlugin = require("html-webpack-plugin");

/*
# Three things webpack should know
1. webpack needs to know the starting point of your application, or 
your root JavaScript file.
2. webpack needs to know which transformations to make on your code.
3. webpack needs to know to which location it should save the new transformed code.

*/

//we need to make sure that this file exports an object which is going to represent our configurations for webpack.
module.exports = {
  //Entry point=>Specify which file webpack should start with to get the internal dependency graph created.
  entry: "./app/index.js",

  //Output property specifying where the bundled file should be generated and what the name of the bundled file would be
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js"
  },

  // This is to specify what webpack should do for a specific type for file.
  module: {
    rules: [
      // it tells webpack to run the babel-loader on all extensions that end in .js.
      { test: /\.(js|jsx)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },

  // In webpack 4, we need to tell it which "mode" we want it to run in - "production" or "development"
  mode: "development",

  // This is used to extend the capabilities of webpack
  plugins: [
    //it  will use the specified file in our src folder. It’ll then use that as a
    // template for our HTML file where all the bundled files will be automatically injected
    new HtmlWebpackPlugin({
      template: "app/index.html"
    })
  ]
};
