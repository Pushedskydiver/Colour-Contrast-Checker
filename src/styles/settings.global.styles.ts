import { css, createGlobalStyle } from 'styled-components';
import { colors } from './settings.colors.styles';
import { typography } from './settings.typography.styles';
import { maxWidth } from './settings.breakpoints.styles';
import spacing from './settings.spacing.styles';

const GlobalStyles = createGlobalStyle`
  :root {
    --background: ${colors.core};
    --foreground: ${colors.dark};
    --font: ${typography.family};
    --copy: inherit;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    color: inherit;
    font-weight: normal;
  }

  html {
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font);
    font-variation-settings: "wght" ${typography.weight.regular};
    line-height: ${typography.lineHeight.body};
    transition: background-color 0.3s ease-in-out;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    ${maxWidth(768, () => css`
      padding-bottom: 80px;
    `)}
  }

  body ::-moz-selection {
    background: var(--foreground);
    color: var(--background);
  }

  body ::selection {
    background: var(--foreground);
    color: var(--background);
  }

  h1,
  h2,
  p {
    margin-top: 0;
    margin-bottom: ${spacing.margin}px;
  }

  img {
    display: block;
    width: 100%;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: none;
    border-radius: 0;
    font-family: inherit;
    cursor: pointer;
    appearance: none;
  }

  input,
  select {
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    border-radius: 0;
    font-family: inherit;
    appearance: none;
  }
`;

export default GlobalStyles;
