var webpack = require('webpack')
var base = require('./webpack.base.config')
var path = require('path')

const clientConfig = Object.assign({}, base, {
    entry: {
        app: './src/app/client-entry.js'
    },
    output: {
     path: path.resolve(__dirname, '../dist'),
     publicPath: '/dist/',
     filename: '[name].client.js'
   },
})

module.exports = clientConfig
