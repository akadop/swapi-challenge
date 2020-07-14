import * as React from 'react'
import App, { AppProps } from 'next/app'
import { Footer, Header, Main, PageWrapper } from '../components/layout'
import { GlobalStyle } from '../core/theme'
import { SwapiProvider } from '../core/data/swapi-provider'
import { swapiFetcher } from '../core/data/fetcher'
import { SWRConfig } from 'swr'

class AppWrapper extends App<AppProps> {
  render() {
    const { Component, router, pageProps } = this.props
    const { pathname, query, asPath } = router
    return (
      <React.Fragment>
        <SWRConfig
          value={{
            fetcher: swapiFetcher
          }}
        >
          <GlobalStyle />
          <Header />
          <PageWrapper>
            <Main>
              <SwapiProvider>
                <Component {...pageProps} asPath={asPath} pathname={pathname} query={query} />
              </SwapiProvider>
            </Main>
            <Footer />
          </PageWrapper>
        </SWRConfig>
      </React.Fragment>
    )
  }
}

export default AppWrapper
