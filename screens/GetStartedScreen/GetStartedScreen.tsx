import React from 'react';
import { StyleSheet, View } from 'react-native';
import BackgroundImage from './components/BackgroundImage';
import Title from './components/Title';
import ActionButtons from './components/ActionButtons';

interface GetStartedScreenProps {
  onGetStarted?: () => void;
}

export default function GetStartedScreen({ onGetStarted }: GetStartedScreenProps) {
  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={styles.contentContainer}>
          <Title />
          <ActionButtons onGetStarted={onGetStarted} />
        </View>
      </BackgroundImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 30,
  },
});
