import { css } from 'styled-components';

function pxToEm(number: number) {
  return `${number / 16}em`;
}

export function minWidth(width: number, callback: Function) {
  return css`
    @media screen and (min-width: ${pxToEm(width)}) {
      ${callback()}
    }
  `;
}

export function maxWidth(width: number, callback: Function) {
  return css`
    @media screen and (max-width: ${pxToEm(width - 0.0625)}) {
      ${callback()}
    }
  `;
}

export function minMaxWidth(minWidth: number, maxWidth: number, callback: Function) {
  return css`
    @media screen and (min-width: ${pxToEm(minWidth)}) and (max-width: ${pxToEm(maxWidth - 0.0625)}) {
      ${callback()}
    }
  `;
}

export function minHeight(width: number, callback: Function) {
  return css`
    @media screen and (min-height: ${pxToEm(width)}) {
      ${callback()}
    }
  `;
}

export function minWidthMinHeight(minWidth: number, minHeight: number, callback: Function) {
  return css`
    @media screen and (min-width: ${pxToEm(minWidth)}) and (min-height: ${pxToEm(minHeight)}) {
      ${callback()}
    }
  `;
}
