import { css } from 'styled-components';

function pxToEm(number) {
  return `${number / 16}em`;
}

export function minWidth(width, callback) {
  return css`
    @media screen and (min-width: ${pxToEm(width)}) {
      ${callback()}
    }
  `;
}

export function maxWidth(width, callback) {
  return css`
    @media screen and (max-width: ${pxToEm(width - 0.0625)}) {
      ${callback()}
    }
  `;
}

export function minMaxWidth(minWidth, maxWidth, callback) {
  return css`
    @media screen and (min-width: ${pxToEm(minWidth)}) and (max-width: ${pxToEm(maxWidth - 0.0625)}) {
      ${callback()}
    }
  `;
}

export function minHeight(width, callback) {
  return css`
    @media screen and (min-height: ${pxToEm(width)}) {
      ${callback()}
    }
  `;
}

export function minWidthMinHeight(minWidth, minHeight, callback) {
  return css`
    @media screen and (min-width: ${pxToEm(minWidth)}) and (min-height: ${pxToEm(minHeight)}) {
      ${callback()}
    }
  `;
}
