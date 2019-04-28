const webpack = require('webpack');
module.exports = {
  context: __dirname,
  entry: {
    general: './src/js/general.js',
    game: './src/js/game.js',
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js',
    publicPath: '/dist/'
  },
  devServer: {  
    compress: true,  port: 8080,  hot: true,
  }, 
  devtool: 'source-map', 
  module: {
    rules: [	
      { 
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: { loader: 'babel-loader', options: { presets: ['env', 'es2015']}}
      }, 
      { 
        test: /\.(less|css)$/, 
        use: [ 'style-loader', 'css-loader', 'less-loader' ]		
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?sourceMap&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?sourceMap'
        ]
      },
      {  
        test: /\.(svg|eot|ttf|woff|woff2)$/,  
        loader: 'url-loader',  options: {    limit: 10000,    name: 'fonts/[name].[ext]'  }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loaders: [
          {
            loader: 'url-loader', options: { limit: 10000, name: 'images/[name].[ext]'}
          },
        'img-loader'
        ],
      },
    ],
  },
  plugins: [ 
    new webpack.ProvidePlugin(
      { 
        jQuery: 'jquery', 
        $: 'jquery', 
        jquery: 'jquery' 
      }), 
    new webpack.HotModuleReplacementPlugin(),
  ],
}