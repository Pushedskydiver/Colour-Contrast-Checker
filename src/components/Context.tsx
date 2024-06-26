import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { isDark, isHsl, hexToHsl, hslToHex, hexToRgb, getContrast, getLevel, updatePath } from './Utils';

import type { TColors, TLevels } from '../global-types';

export interface ColourContrastContextTypes {
  colors: TColors[],
  background: number[],
  foreground: number[],
  contrast: number,
  level: TLevels,
  colorState: string,
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
  const localColors = JSON.parse(localStorage.getItem('colors') as string);
  const levels: TLevels = { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Pass' };
  const updateViewRef = useRef(updateView);

  const [colors, setColors] = useState<TColors[]>(localColors || []);
  const [background, setBackground] = useState<number[]>([49.73, 1, 0.71]);
  const [foreground, setForeground] = useState<number[]>([NaN, 0, 0.133]);
  const [contrast, setContrast] = useState<number>(12.72);
  const [level, setLevel] = useState<TLevels>(levels);
  const colorState: string = contrast < 3 ? isDark(background) ? '#ffffff' : '#222222' : hslToHex(foreground);

  function checkContrast(bg: string, fg: string): void {
    const backgroundRgb = hexToRgb(bg);
    const foregroundRgb = hexToRgb(fg);
    const newContrast = getContrast(backgroundRgb as number[], foregroundRgb as number[]);
    const newLevel = getLevel(newContrast);

    setContrast(newContrast);
    setLevel(newLevel);
  }

  function handleContrastCheck(value: number[], name: string): void {
    const bg = name === 'background' ? hslToHex(value) : hslToHex(background);
    const fg = name === 'foreground' ? hslToHex(value) : hslToHex(foreground);

    name === 'background' ? setBackground(value) : setForeground(value);

    document.body.style.setProperty(`--${name}-color`, hslToHex(value));

    checkContrast(bg, fg);

    updatePath(hexToHsl(bg) as number[], hexToHsl(fg) as number[]);
  }

  function saveColors(): void {
    const colors = JSON.parse(localStorage.getItem('colors') as string) || [];
    const bg = hslToHex(background);
    const fg = hslToHex(foreground);
    const sameColors = colors.filter((color: TColors) => color.background === bg && color.foreground === fg).length > 0;

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

    if (!isHsl(bg as number[]) || !isHsl(fg as number[])) {
      return;
    }

    updateViewRef.current(bg as number[], fg as number[]);
  }, []);

  return (
    <ColourContrastContext.Provider
      value={{
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
