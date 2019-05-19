const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const publicDir = path.join(__dirname, "/public");
module.exports = {
  node: {
    fs: "empty"
  },
  entry: { main: path.join(__dirname, "src/index.tsx") },
  output: {
    path: publicDir,
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.join(__dirname, "src")],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults, current node"
                  }
                ]
              ],
              plugins: [
                [
                  "babel-plugin-root-import",
                  {
                    rootPathSuffix: "src"
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: [path.join(__dirname, "src")],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults, current node"
                  }
                ]
              ],
              plugins: [
                [
                  "babel-plugin-root-import",
                  {
                    rootPathSuffix: "src"
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: [path.join(__dirname, "src")],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "~": path.join(__dirname, "src/rootPathSuffix")
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react/,
          name: "react",
          chunks: "all"
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      })
    ]
  }
};
