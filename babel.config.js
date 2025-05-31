module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src/app'],
          alias: {
            '@app': './src/app',
            '@styles': './src/styles',
          },
        },
      ],
    ]
  }
} 