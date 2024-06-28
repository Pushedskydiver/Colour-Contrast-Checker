export type TColors = {
  background: string,
  foreground: string
}

export type TLevels = {
  AALarge: 'Pass' | 'Fail',
  AA: 'Pass' | 'Fail',
  AAALarge: 'Pass' | 'Fail',
  AAA: 'Pass' | 'Fail'
}

export type TGoogleWebfontList = {
  kind: string;
  items: TGoogleWebfontFamily[];
}

export type TGoogleWebfontFamily = {
  category?: string | undefined;
  kind: string;
  family: string;
  subsets: string[];
  variants: string[];
  version: string;
  lastModified: string;
  files: { [variant: string]: string };
}
