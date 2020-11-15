export function rgba(hex: string, opacity: number) {
  const hexCode = hex.replace('#', '');
  const r = parseInt(hexCode.substring(0, 2), 16);
  const g = parseInt(hexCode.substring(2, 4), 16);
  const b = parseInt(hexCode.substring(4, 6), 16);
  const result = `rgba(${r},${g},${b},${opacity})`;

  return result;
}

export const colors = {
  core: '#ffe66d',
  light: '#ffffff',
  dark: '#222222'
};
