import "react-native-unistyles";
import { UnistylesRegistry } from "react-native-unistyles";

const modernMusic = {
  colors: {
    primary: "#6F42C1",
    primaryLight: "#9A6DDF",
    accent: "#00FFC2",
    background: "#0D0D0D",
    surface: "#1A1A1A",
    textPrimary: "#FFFFFF",
    textSecondary: "#B3B3B3",
    borderMuted: "#333333",
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },

  typography: {
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "#FFFFFF",
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
      color: "#B3B3B3",
    },
    caption: {
      fontSize: 12,
      fontWeight: "300",
      color: "#B3B3B3",
    },
  },
};

const modernMusicLight = {
  colors: {
    primary: "#6F42C1",
    primaryLight: "#9A6DDF",
    accent: "#00FFC2",
    background: "#FFFFFF",
    surface: "#F4F4F4",
    textPrimary: "#111111",
    textSecondary: "#555555",
    borderMuted: "#DDDDDD",
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },

  typography: {
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "#111111",
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
      color: "#555555",
    },
    caption: {
      fontSize: 12,
      fontWeight: "300",
      color: "#777777",
    },
  },
};

const appThemes = {
  light: modernMusicLight,
  dark: modernMusic,
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
declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

UnistylesRegistry.addThemes(appThemes).addBreakpoints(breakpoints).addConfig({
  adaptiveThemes: true,
  initialTheme: "light",
});
