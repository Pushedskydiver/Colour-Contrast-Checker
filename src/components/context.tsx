import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { isHsl, hexToHsl, hslToHex, hexToRgb, getContrast, getLevel, updatePath, isDark } from './utils';

import type { TColors, TLevels } from '../global-types';

export interface ColourContrastContextTypes {
  colors: TColors[],
  background: number[],
  foreground: number[],
  contrast: number,
  level: TLevels,
  isBackgroundDark: boolean,
  isPoorContrast: boolean,
  handleContrastCheck: (value: number[], name: string) => void,
  reverseColors: () => void,
  saveColors: () => void,
  setColors: React.Dispatch<React.SetStateAction<TColors[]>>,
  updateView: (bg: number[], fg: number[]) => void,
  updatePath: (bg: number[], fg: number[]) => void
}

const ColourContrastContext = createContext<ColourContrastContextTypes | undefined>(undefined);

const ColourContrastProvider = (
  props: { children: React.ReactNode }
): JSX.Element => {
  const storedColors = localStorage.getItem('colors');
  const localColors = storedColors ? JSON.parse(storedColors) : [];
  const levels: TLevels = { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Pass' };
  const updateViewRef = useRef(updateView);

  const [colors, setColors] = useState<TColors[]>(localColors);
  const [background, setBackground] = useState<number[]>([49.73, 1, 0.71]);
  const [foreground, setForeground] = useState<number[]>([NaN, 0, 0.133]);
  const [contrast, setContrast] = useState<number>(12.72);
  const [level, setLevel] = useState<TLevels>(levels);
  const isBackgroundDark = isDark(background);
  const isPoorContrast = contrast < 3;

  function checkContrast(bg: string, fg: string): void {
    const backgroundRgb = hexToRgb(bg);
    const foregroundRgb = hexToRgb(fg);

    if (!backgroundRgb || !foregroundRgb) return;

    const newContrast = getContrast(backgroundRgb, foregroundRgb);
    const newLevel = getLevel(newContrast);

    setContrast(newContrast);
    setLevel(newLevel);
  }

  function handleContrastCheck(value: number[], name: string): void {
    const bg = name === 'background' ? hslToHex(value) : hslToHex(background);
    const fg = name === 'foreground' ? hslToHex(value) : hslToHex(foreground);
    const bgHsl = hexToHsl(bg);
    const fgHsl = hexToHsl(fg);

    if (!bgHsl || !fgHsl) return;

    name === 'background' ? setBackground(value) : setForeground(value);

    document.body.style.setProperty(`--${name}-color`, hslToHex(value));

    checkContrast(bg, fg);
    updatePath(bgHsl, fgHsl);
  }

  function saveColors(): void {
    const storedColors = localStorage.getItem('colors');
    const colors: TColors[] = storedColors ? JSON.parse(storedColors) : [];
    const bg = hslToHex(background);
    const fg = hslToHex(foreground);
    const sameColors = colors.some((color) => color.background === bg && color.foreground === fg);

    if (colors.length > 0 && sameColors) return;

    if (colors.length > 5) {
      colors.pop();
    }

    colors.unshift({ background: bg, foreground: fg });
    localStorage.setItem('colors', JSON.stringify(colors));
    setColors(colors);
  }

  function updateView(bg: number[], fg: number[]): void {
    const backgroundHex = hslToHex(bg);
    const foregroundHex = hslToHex(fg);

    document.body.style.setProperty('--background-color', backgroundHex);
    document.body.style.setProperty('--foreground-color', foregroundHex);

    checkContrast(backgroundHex, foregroundHex);
    setBackground(bg);
    setForeground(fg);
  }

  function reverseColors(): void {
    updateView(foreground, background);
    updatePath(foreground, background);
  }

  useEffect(() => {
    const path = window.location.pathname.split('/');
    const bg = hexToHsl(path[1]);
    const fg = hexToHsl(path[2]);

    if (!bg || !fg) return;

    if (!isHsl(bg) || !isHsl(fg)) return;

    updateViewRef.current(bg, fg);
  }, []);

  return (
    <ColourContrastContext.Provider
      value={{
        colors,
        background,
        foreground,
        contrast,
        level,
        isBackgroundDark,
        isPoorContrast,
        handleContrastCheck,
        reverseColors,
        saveColors,
        setColors,
        updateView,
        updatePath
      }}
    >
      {props.children}
    </ColourContrastContext.Provider>
  );
}

const useColourContrast = (): ColourContrastContextTypes => {
  const context = useContext(ColourContrastContext)

  if (context === undefined) {
    throw new Error('useColourContrast must be used within a ColourContrastProvider')
  }

  return context
}

export { ColourContrastContext, useColourContrast }

export default ColourContrastProvider;
