const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require('nodemon-webpack-plugin');

const dirName = path.join(__dirname, "../");


const serverConfig = (packageEnv) => {
    return {
        mode: process.env.NODE_ENV,
        name: "server",
        target: "node",
        node: {__dirname: false},
        entry: path.join(dirName, "/server/index.ts"),
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.(wav)$/,
                    use: ["null-loader"]
                },
                {
                    test: /\.(png|jpg|svg|gif|wav)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            emitFile: false,
                            publicPath: `${process.env.PUBLIC_URL}/static`,
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: ["null-loader"]
                },
            ],
        },
        output: {
            filename: "index.js",
            libraryTarget: "commonjs2",
            path: path.join(dirName, "serverDist"),
        },
        resolve: {
            modules: ["src", "node_modules"],
            extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx"],
        },
        devtool: "source-map",
        externals: [nodeExternals({allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i]})],
        optimization: {nodeEnv: false},
        plugins: [
            process.env.NODE_ENV === "development" && new NodemonPlugin({
                nodeArgs: [ '--inspect' ]
            })
        ].filter(Boolean),
    };
};

module.exports = serverConfig;
