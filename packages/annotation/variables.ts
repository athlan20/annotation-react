export const PREFIX = 'anno';

export function c(name: string) {
  return `${PREFIX}_${name}`;
}

export const PresetColors = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
] as const;

export type PresetColorKey = (typeof PresetColors)[number];
