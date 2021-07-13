const webpack = require('webpack');
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsListPlugin = require("../webpackAssetsListPlugin.js");
const getClientEnvironment = require('./env');

const dirName = path.join(__dirname, "../");


const clientConfig = (packageEnv) => {
    const {NODE_ENV} = process.env;
    const isDev = NODE_ENV === "development";
    const isProd = NODE_ENV === "production";

    if (!isDev && !isProd) {
        throw Error("Необходимо указать NODE_ENV=(development|production)");
    }

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
            path: path.join(dirName, "dist"),
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
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                publicPath: '/',
                                esModule: false
                            }
                        }
                    ]
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
            new webpack.DefinePlugin(getClientEnvironment().stringified),
            new MiniCssExtractPlugin({
                filename: "[name]-bundle.css",
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
