
function calcFontSize(number) {
  return `${number / 16}em`;
}

export const typography = {
  lineHeight: {
    heading: 1.3,
    body: 1.7
  },
  family: {
    primary: 'Avenir Next, sans-serif',
    secondary: 'Nunito VF, sans-serif'
  },
  heading: {
    size: {
      tiny: `calc(${calcFontSize(10)} + 0.5vw)`,
      small: `calc(${calcFontSize(16)} + 0.5vw)`,
      regular: `calc(${calcFontSize(22)} + 0.5vw)`,
      medium: `calc(${calcFontSize(32)} + 0.5vw)`,
      big: `calc(${calcFontSize(48)} + 0.5vw)`,
      large: `calc(${calcFontSize(72)} + 0.5vw)`,
      xl: `calc(${calcFontSize(124)} + 0.5vw)`
    }
  },
  body: {
    size: {
      tiny: `calc(${calcFontSize(12)} + 0.1vw)`,
      small: `calc(${calcFontSize(14)} + 0.1vw)`,
      regular: `calc(${calcFontSize(16)} + 0.1vw)`,
      medium: `calc(${calcFontSize(18)} + 0.1vw)`,
      large: `calc(${calcFontSize(20)} + 0.1vw)`
    }
  },
  weight: {
    light: '100',
    thin: '300',
    regular: '400',
    medium: '500',
    bold: '600',
    thick: '700'
  }
};
