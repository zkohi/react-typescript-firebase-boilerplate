const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
const webpack = require("webpack");
const path = require("path");
const DotEnv = require("dotenv-webpack");
const HtmlPlugin = require("html-webpack-plugin");
const WorkBoxPlugin = require("workbox-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
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