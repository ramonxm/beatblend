
import 'react-native-unistyles';
import { UnistylesRegistry } from 'react-native-unistyles';

const lightTheme = {
  colors: {
    primary: '#ff1ff4',
    secondary: '#1ff4ff',
    background: '#fff',
  },
  gap: (v: number) => v * 8,
};

const darkTheme = {
  colors: {
    primary: '#aa12ff',
    secondary: 'pink',
    background: '#222',
  },
  gap: (v: number) => v * 8,
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};


type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

UnistylesRegistry.addThemes(appThemes).addBreakpoints(breakpoints).addConfig({
  adaptiveThemes: true,
  initialTheme: 'light',
});