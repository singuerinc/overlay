export enum Color {
  GRAY = '#adb5bd',
  RED = '#ff6b6b',
  PINK = '#f06595',
  GRAPE = '#cc5de8',
  VIOLET = '#845ef7',
  INDIGO = '#5c7cfa',
  BLUE = '#339af0',
  CYAN = '#22b8cf',
  TEAL = '#20c997',
  GREEN = '#51cf66',
  LIME = '#94d82d',
  YELLOW = '#fcc419',
  ORANGE = '#ff922b'
}

export const colors = [
  Color.RED,
  Color.ORANGE,
  Color.INDIGO,
  Color.LIME,
  Color.YELLOW
];

export const nextColor = (color: Color): Color => {
  const index = colors.indexOf(color) + 1;
  return colors[(index + 1) % colors.length];
};
