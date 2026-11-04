import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

export default function BackgroundImage({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/signup.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {children}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  }
});
