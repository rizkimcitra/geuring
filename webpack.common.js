const path = require("path")
const HtmlWebpaakPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(svg|png|)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpaakPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new FaviconsWebpackPlugin("./src/icons/world_map.svg"),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
}
