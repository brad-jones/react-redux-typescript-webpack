import path from "path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

//@ts-ignore
const webpackConfig = (env: any, argv: any): Configuration => ({
    entry: "./src/index.tsx",
    devtool: "eval-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: [
                    /dist/,
                    /node_modules/,
                    /\.test.ts(x?)$/,
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            minify: false
        }),
        new webpack.DefinePlugin({
            "process.env.FOO": JSON.stringify("bar")
        })
    ]
});

export default webpackConfig;