var path = require('path')
module.exports = {
 module: {
     rules:[{
         test: /\.vue$/,
         exclude: '/node_modules/',
         loader: 'vue-loader',
         options: {}
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
         exclude: '/node_modules/',
         options: {
             presets: ['es2015', 'stage-0']
       }
      }
  ]}
}
