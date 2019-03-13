
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.s?css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')({
                  browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1']
                })
              ]
            }
          },
          {loader: 'sass-loader'}
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss' ]
  },

  output: {
    path: __dirname + '/build',
    filename: 'blue-herring.js',
    library: 'blue-herring',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  externals: {
    "@blueprintjs/core": "@blueprintjs/core",
    "@blueprintjs/icons": "@blueprintjs/icons",
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
