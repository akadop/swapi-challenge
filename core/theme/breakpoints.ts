export type ThemeBreakpoint = 'desktop' | 'tablet'
import { css } from 'styled-components'

export const THEME_BREAKPOINTS = {
  desktopFull: 1280,
  tablet: 768
} as const

export const toBreakpoint = (breakpoint: ThemeBreakpoint) => {
  const breakpointPx = THEME_BREAKPOINTS[breakpoint]
  return (...args: any) => css`
    @media (max-width: ${breakpointPx - 1}px) {
      ${args};
    }
  `
}

export const fromBreakpoint = (breakpoint: ThemeBreakpoint) => {
  const breakpointPx = THEME_BREAKPOINTS[breakpoint]
  return (...args: any) => css`
    @media (min-width: ${breakpointPx}px) {
      ${args};
    }
  `
}
