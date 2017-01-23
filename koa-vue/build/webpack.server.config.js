var webpack = require('webpack')
var base = require('./webpack.base.config')
var path = require('path')

const config = Object.assign({}, base, {
    target: 'node',
    entry: {
        app: './src/app/server-entry.js'
    },
    output: {
         libraryTarget: 'commonjs2',
         path: path.resolve(__dirname, '../dist'),
         publicPath: '/dist/',
         filename: '[name].server.js'
    },
    plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    })
  ]
})

module.exports = config
