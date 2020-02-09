let path = require("path"); //引用node的path模块
let htmlwebpackPlugin = require("html-webpack-plugin"); //引用插件
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let webpack = require("webpack"); //获取webpack插件的主函数

module.exports = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: { //这个是我们自己临时搭建的一个服务器
        contentBase: "./bundle", //服务器的根目录位置
        open: true, //运行了npm run start指令之后,会自动帮我们打开浏览器
        port: 9527, //自定义端口
        hot: true, //开启热模块更新包
        hotOnly: true, //即使HMR不生效 ,浏览器也不会刷新
    },
    entry: {
        wangyubo: "./src/js/index.js",
    },
    output: {
        path: path.resolve(__dirname, "bundle") //打包成功后再当前文件夹下创建一个文件,名字叫做bundle
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
            options: {
                plugins: [
                    [
                        "@babel/plugin-transform-runtime",
                        {
                            "absoluteRuntime": false,
                            "corejs": 2,
                            "helpers": true,
                            "regenerator": true,
                            "useESModules": false
                        }
                    ]
                ]
            }
        }]
    },
    plugins: [
        new htmlwebpackPlugin({
            template: "src/html/template.html"
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}