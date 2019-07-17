const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin()
        ]
}
