module.exports = {
    assetsDir: "./assets",
    outputDir: "./bundle",
    indexPath: "./wyb.html",
    filenameHashing: false,
    devServer: {
        port: 9527,
        open: true,
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'product') {
            //todo 为生产环境修改配置
        } else {
            //todo 为开发环境修改配置
        }
    }
}