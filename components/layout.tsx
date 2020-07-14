import rem from 'polished/lib/helpers/rem'
import styled from 'styled-components'

const determineRem = (value: number) => rem(value, 18)

export const Main = styled.main`
  background-color: #f5f6f7;
  min-height: 70vh;
  width: 100%;
  flex: 1;
`

export const Container = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: ${determineRem(1140)};
  padding: 0 ${determineRem(16)};
`

export const PageWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-width: 100%;
  min-height: 100vh;
`

export const Header = styled.header`
  background-color: #2b253a;
  padding: 0 2.5%;
  width: 100%;
`

export const Footer = styled.footer`
  padding: 30px 2.5% 68px 2.5%;
  width: 100%;
  background-color: #19181f;
  text-align: center;

  @media screen and (min-width: 600px) {
    text-align: left;
  }
`
