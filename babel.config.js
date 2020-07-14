module.exports = function (api) {
  api.cache(true)

  const presets = [['next/babel']]

  const plugins = [
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
        pure: true
      }
    ],
    ['lodash'],
    ['polished'],
    ['@babel/plugin-proposal-optional-chaining']
  ]

  return {
    presets,
    plugins
  }
}
