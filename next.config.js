const webpack = require('webpack')
const withPlugins = require('next-compose-plugins')
const { IgnorePlugin } = require('webpack')

const nextConfig = {
  serverRuntimeConfig: {
    SWAPI_BASE_URL: process.env.SWAPI_BASE_URL,
    SWAPI_PEOPLE_ENDPOINT: process.env.SWAPI_PEOPLE_ENDPOINT,
    SWAPI_FILM_ENDPOINTL: process.env.SWAPI_FILM_ENDPOINT
  },
  publicRuntimeConfig: {},
  webpack: (config, { dev }) => {
    const webpackPlugins = config.plugins
    const webpackRules = config.module.rules

    const customWebpackConfig = {
      plugins: {
        base: [new IgnorePlugin(/^\.\/locale$/, /moment$/)],
        prod: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
          })
        ]
      },
      rules: {
        base: []
      }
    }

    webpackRules.push(...customWebpackConfig.rules.base)
    webpackPlugins.push(...customWebpackConfig.plugins.base)

    if (!dev) {
      webpackPlugins.push(...customWebpackConfig.plugins.prod)
      config.devtool = 'none'
    }

    if (process.env.ANALYZE) {
      new DuplicatesPlugin({
        // Emit compilation warning or error? (Default: `false`)
        emitErrors: false,
        // Display full duplicates information? (Default: `false`)
        verbose: false
      })
    }

    return config
  }
}

module.exports = withPlugins([], nextConfig)
