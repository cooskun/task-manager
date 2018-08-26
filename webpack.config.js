// Dependencies
const webpack = require("webpack");
const path = require("path");

// Plugins
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    app: "./client/src/script/root.js"
  },
  output: {
    path: path.resolve("client/dist"),
    filename: "js/[name].bundle.js"
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["env", "react"]
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "resolve-url-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
          "resolve-url-loader"
        ]
      }
    ]
  },

  plugins: [
    /* Clean dist folder before re-writing */
    new CleanWebpackPlugin("client/dist", {
      root: process.cwd()
    }),

    new HTMLWebpackPlugin({
      template: "./client/src/index.html",
      filename: "index.html",
      inject: "body"
    }),

    /* Log the Progress */
    new webpack.ProgressPlugin()
  ]
};

module.exports = config;
