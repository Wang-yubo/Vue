let webpack = require("webpack"); //获取webpack插件的主函数
let merge = require("webpack-merge");
let commonConfig = require("./webpack.common.js")
let devConfig = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: { //这个是我们自己临时搭建的一个服务器
        contentBase: "./bundle", //服务器的根目录位置
        open: true, //运行了npm run start指令之后,会自动帮我们打开浏览器
        port: 9527, //自定义端口
        hot: true, //开启热模块更新包
        hotOnly: true, //即使HMR不生效 ,浏览器也不会刷新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports = merge(devConfig, commonConfig)