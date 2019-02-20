const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'import-glob-loader'],
      },
      {
        test: /\.s?css$/,
        use: [
          {loader: 'style-loader'}, // creates style nodes from JS strings
          {loader: 'css-loader', options: {modules: true}}, // translates CSS into CommonJS
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({
                  browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1']
                })
              ]
            }
          },
          {loader: 'sass-loader'} // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.demo.tsx', '.tsx', '.ts', '.js', '.scss', '.css' ]
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
