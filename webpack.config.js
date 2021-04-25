const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist/static"),
    filename: "bundle-[fullhash].js",
    publicPath: "/static/",
    clean: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "bundle-[fullhash].css",
    }),
    new HtmlWebpackPlugin({
        template: "src/index.html",
        filename: "../index.html",
        publicPath: "/static",
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
        },
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                context: path.resolve(__dirname),
                from: "src/assets/"
            }
        ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    index: "index.html",
    writeToDisk: true
  },
};
