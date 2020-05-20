module.exports = {
  entry: './src/js/script.js',
  output: {
    filename: 'script.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { targets: { browsers: ['ie >= 11', 'safari > 9'] } },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
}
