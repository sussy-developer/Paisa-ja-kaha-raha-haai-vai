import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

interface AllExpensesBackgroundProps {
  children: React.ReactNode;
}

export default function AllExpensesBackground({ children }: AllExpensesBackgroundProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/all-expense.png')}
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
