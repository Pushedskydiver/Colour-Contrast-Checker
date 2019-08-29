import React, { useEffect, useRef, useState } from 'react';
import { fetchData, isDark, isHsl, hexToHsl, hslToHex, hexToRgb, getContrast, getLevel, updatePath } from '../components/Utils';

const Context = React.createContext({});

export function ContextProvider(props) {
  const localColors = JSON.parse(localStorage.getItem('colors'));
  const localFonts = JSON.parse(localStorage.getItem('fonts'));
  const levels = { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Pass' };
  const updateViewRef = useRef(updateView);

  const [fonts, setfonts] = useState(localFonts || []);
  const [colors, setColors] = useState(localColors || []);
  const [background, setBackground] = useState([49.73, 1, 0.71]);
  const [foreground, setForeground] = useState([NaN, 0, 0.133]);
  const [contrast, setContrast] = useState(12.72);
  const [level, setLevel] = useState(levels);
  const colorState = contrast < 3 ? isDark(background) ? '#ffffff' : '#222222' : hslToHex(foreground);

  function checkContrast(bg, fg) {
    const backgroundRgb = hexToRgb(bg);
    const foregroundRgb = hexToRgb(fg);
    const newContrast = getContrast(backgroundRgb, foregroundRgb);
    const newLevel = getLevel(newContrast);

    setContrast(newContrast);
    setLevel(newLevel);
  }

  function handleContrastCheck(value, name) {
    const bg = name === 'background' ? hslToHex(value) : hslToHex(background);
    const fg = name === 'foreground' ? hslToHex(value) : hslToHex(foreground);

    name === 'background' ? setBackground(value) : setForeground(value);

    document.body.style.setProperty(`--${name}`, hslToHex(value));
    checkContrast(bg, fg);
    updatePath(hexToHsl(bg), hexToHsl(fg));
  }

  function storeFontsData({ items }) {
    const families = items.slice(0, 50);
    const fonts = [];

    families.forEach(item => {
      const { family, variants } = item;
      const weight = variants.sort();
      const variant = weight[weight.length - 1];

      fonts.push({ family, variant });
    });

    localStorage.setItem('fonts', JSON.stringify(families));
    setfonts(fonts);
  }

  function saveColors() {
    const colors = JSON.parse(localStorage.getItem('colors')) || [];
    const bg = hslToHex(background);
    const fg = hslToHex(foreground);
    const sameColors = colors.filter(color => color.background === bg && color.foreground === fg).length > 0;

    if (colors.length > 0 && sameColors) {
      return;
    }

    if (colors.length > 5) {
      colors.pop();
    }

    colors.unshift({ background: bg, foreground: fg });

    localStorage.setItem('colors', JSON.stringify(colors));
    setColors(colors);
  }

  function updateView(bg, fg) {
    const backgroundHex = hslToHex(bg);
    const foregroundHex = hslToHex(fg);

    document.body.style.setProperty('--background', backgroundHex);
    document.body.style.setProperty('--foreground', foregroundHex);

    checkContrast(backgroundHex, foregroundHex);
    setBackground(bg);
    setForeground(fg);
  }

  function reverseColors() {
    updateView(foreground, background);
    updatePath(foreground, background);
  }

  useEffect(() => {
    const path = window.location.pathname.split('/');
    const fontsData = localStorage.getItem('fonts');
    const bg = hexToHsl(path[1]);
    const fg = hexToHsl(path[2]);

    function fetchGoogleFontsData() {
      const apiKey = process.env.REACT_APP_GOOGLE_FONT_API_KEY;
      const googleFontsApi = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`;

      fetchData(googleFontsApi)
        .then(data => storeFontsData(data))
        .catch(error => console.error(error));
    }

    if (fontsData === null) {
      fetchGoogleFontsData();
    }

    if (!isHsl(bg) || !isHsl(fg)) {
      return;
    }

    updateViewRef.current(bg, fg);
  }, []);

  const data = {
    fonts,
    colors,
    background,
    foreground,
    contrast,
    level,
    colorState,
    handleContrastCheck,
    reverseColors,
    saveColors,
    setColors,
    updateView,
    updatePath
  };

  return (
    <Context.Provider value={data}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;
