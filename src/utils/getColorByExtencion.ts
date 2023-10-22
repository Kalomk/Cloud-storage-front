const extColor = {
  svg: 'green',
  jpeg: 'blue',
  pdf: 'red',
  webp: 'puprle',
  gif: 'grey',
  txt: 'pink',
  zip: 'orange',
  png: 'coral',
  jpg: 'green',
} as const;

export type Extension = keyof typeof extColor;
export type Color = (typeof extColor)[Extension];

export const getColorByExtencion = (ext: Extension): Color => {
  return extColor[ext];
};
