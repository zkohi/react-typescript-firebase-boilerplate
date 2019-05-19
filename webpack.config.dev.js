const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
const path = require("path");
const DotEnv = require("dotenv-webpack");
const HtmlPlugin = require("html-webpack-plugin");
const WorkBoxPlugin = require("workbox-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

const publicDir = path.join(__dirname, "/public");
module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: "8080",
    historyApiFallback: true,
    contentBase: publicDir
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new DotEnv(),
    new WorkBoxPlugin.InjectManifest({
      swSrc: path.join(__dirname, "src/sw.js"),
      swDest: "sw.js"
    }),
    new HtmlPlugin({
      hash: true,
      template: path.join(__dirname, "src/index.html.ejs")
    })
  ]
});
