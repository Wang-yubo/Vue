let path = require("path"); //引用node的path模块
let htmlwebpackPlugin = require("html-webpack-plugin"); //引用插件
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let config = {
    entry: {
        index: "./src/js/index.js",
        content: "./src/js/Content.js"
    },
    output: {
        path: path.resolve(__dirname, "../bundle") //打包成功后再当前文件夹下创建一个文件,名字叫做bundle
    },
    //配置处理图片的loader
    module: {
        rules: [{
            test: /\.(jpg|png|jpeg|gif|webp)$/,
            use: {
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "./images",
                    limit: 2048
                }
            }
        }, {
            test: /\.(css|scss)$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        importLoaders: 2
                            //通过import语法引入的文件,也要走下面的两个loader
                    }
                },
                "sass-loader",
                "postcss-loader"
            ]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "./font"
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/, //忽视该文件
            loader: "babel-loader",
        }]
    },
    optimization: {
        usedExports: true,
    },
}

let makePlugins = (config) => {
    let plugins = [
        new CleanWebpackPlugin()
    ];
    Object.keys(config.entry).forEach((key) => {
        plugins.push(
            new htmlwebpackPlugin({
                template: "./src/html/template.html",
                filename: `${key}.html`,
                chunks: [key]
            })
        );
    })
    return plugins;
}
config.plugins = makePlugins(config)
module.exports = config