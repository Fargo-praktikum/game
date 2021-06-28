const webpack = require('webpack');
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsListPlugin = require("../webpackAssetsListPlugin.js");
const getClientEnvironment = require('./env');

const dirName = path.join(__dirname, "../");


const clientConfig = (packageEnv) => {
    // console.log("process.env.NODE_ENV from clientConfig");
    const { NODE_ENV } = process.env;

    if (NODE_ENV !== "development" && NODE_ENV !== "production") {
        throw Error("Необходимо указать NODE_ENV=(development|production)");
    }

    const env = getClientEnvironment();
    // console.log("env from clientConfig");
    // console.log(env);

    return {
        mode: process.env.NODE_ENV,
        entry: {
            "static/app": path.join(dirName, "/src/index.tsx"),
            sw: {
                import: path.join(dirName, "/src/sw.ts"),
                filename: "[name].js"
            }
        },
        output: {
            path: path.join(dirName, "/dist"),
            filename: "[name]-bundle.js",
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
                    test: /\.(png|jpg|svg|gif|wav)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin(env.stringified),
            new MiniCssExtractPlugin({
                filename: "[name]-bundle.css",
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        context: path.resolve(dirName),
                        from: "src/assets/",
                        to: "static"
                    }
                ],
            }),
            new WebpackAssetsListPlugin({
                dir: path.join(dirName, "/dist")
            })
        ],
        stats: {
            // хочешь больше логов - расскоменти
            //children: true,
        }
    };
};

module.exports = clientConfig;
