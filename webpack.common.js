const path = require("path")
const HtmlWebpaakPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: "file-loader?name=[name].[ext]",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpaakPlugin({
      template: "./src/index.html",
      filename: "index.html",
      favicon: path.resolve(__dirname, "./src/favicon.ico"),
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
}
