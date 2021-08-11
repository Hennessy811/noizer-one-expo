const tintColorLight = '#2f95dc';
const tintColorDark = '#323232';

export interface ColorTheme {
  text: string;
  textDisabled: string;
  background: string;
  backgroundDisabled: string;
  tint: string;
  borderColor: string;
  [k: string]: string;
}

export default {
  light: {
    text: '#323232',
    textDisabled: '#686868',
    background: '#FFFFFF',
    backgroundDisabled: '#E3E3E3',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    borderColor: '#323232',
  },
  dark: {
    text: '#FFFFFF',
    textDisabled: '#686868',
    backgroundDisabled: '#D2D2D2',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    borderColor: '#DEDEDE',
  },
};
