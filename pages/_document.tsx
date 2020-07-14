import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { Helmet, HelmetData } from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'

/**
 *
 * The purpose of this file is to collect all styles we generate via styled-components
 * and inject it into the HTML. We can also add general SEO head tags here.
 *
 */

export default class extends Document<{
  helmet: HelmetData
}> {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        helmet: Helmet.renderStatic(),
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  render() {
    return (
      <html lang="en" {...this.helmetHtmlAttrComponents}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="referrer" content="origin" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta httpEquiv="expires" content="10800" />
          {this.helmetHeadComponents}
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
