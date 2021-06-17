const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require('nodemon-webpack-plugin');

const dirName = path.join(__dirname, "../");

const serverConfig = {
    name: "server",
    target: "node",
    node: { __dirname: false },
    entry: path.join(dirName, "index.ts"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|svg|gif|wav)$/,
                use: ["null-loader"]
            },
            {
                test: /\.scss$/,
                use: ["null-loader"]
            },
        ],
    },
    output: {
        filename: "server.js",
        libraryTarget: "commonjs2",
        path: path.join(dirName, "serverDist"),
    },
    resolve: {
        modules: ["src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    devtool: "source-map",
    externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
    optimization: { nodeEnv: false },
    plugins: [
        new NodemonPlugin(),
    ],
};

module.exports = serverConfig;
