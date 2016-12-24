const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports = {
  entry: [
    path.resolve(__dirname+'/src/main.js')
  ],
  output: {
    path: path.resolve(__dirname+'/app'),
    publicPath: '/app',
    filename: 'build.js'
  },
  module: {
    rules: [
      //转化ES6语法
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel'
          }
        ],
        query: {
          plugins: ['transform-runtime', 'lodash'],
          presets: ['es2015']
        },
        exclude: /node_modules/
      },
      //解析.vue文件
      {
        test:/\.vue$/,
        use:[
          {
            loader:'vue'
          }
        ]
      },
      //图片转化，小于8K自动转化为base64的编码
      {
        test: /\.(png|jpg|gif)$/,
        use:[
          {
            loader:'url-loader?limit=8192'
          }
        ]
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: __dirname,
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff2"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: './index.html', //生成的html存放路径，相对于 path
      template: './static/index.html', //html模板路径
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  resolveLoader:{
    moduleExtensions: ['-loader']
  },
  resolve: {
        // require时省略的扩展名，如：require('app') 不需要app.js
        extensions: ['.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            filter: path.join(__dirname, './src/filters'),
            'vue$': 'vue/dist/vue.common.js',
            components: path.join(__dirname, './src/components')
        }
    }    
}