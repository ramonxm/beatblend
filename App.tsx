import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

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

// TypeScript module augmentation for Unistyles
// In a real project, move this to a separate .d.ts file
import 'react-native-unistyles';
type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings: {
    adaptiveThemes: true,
    initialTheme: 'light',
  },
});

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: theme.colors.primary,
    fontSize: 18,
    marginTop: 16,
  },
}));

const App: React.FC = () => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text style={styles.primaryText}>Primary color: {theme.colors.primary}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
