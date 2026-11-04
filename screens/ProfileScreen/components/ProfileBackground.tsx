import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

interface ProfileBackgroundProps {
  children: React.ReactNode;
}

export default function ProfileBackground({ children }: ProfileBackgroundProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/profile-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          {children}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0C',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
});
