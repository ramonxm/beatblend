import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import './src/styles/global';

const stylesheet = createStyleSheet((theme) => ({
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

const App = () => {
    const { theme, styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text style={styles.primaryText}>Primary color: {theme.colors.primary}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
