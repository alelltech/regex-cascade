const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs-static",
    umdNamedDefine: true,
  },
  devtool: "source-map",
  plugins: [
    new webpack.BannerPlugin(fs.readFileSync("LICENSE", "utf8")),
    new webpack.SourceMapDevToolPlugin({}),
  ],
};

// module.exports = {
//   mode: "production",
//   entry: `./src/index.ts`,
//   output: {
//     path: path.resolve(__dirname, "lib"),
//     filename: `index.js`,
//   },
//   target: "async-node",
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: "ts-loader",
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".ts"],
//   },
//   plugins: [new webpack.BannerPlugin(fs.readFileSync("LICENSE", "utf8"))],
// };
