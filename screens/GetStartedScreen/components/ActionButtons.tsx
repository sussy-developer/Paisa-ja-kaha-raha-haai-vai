import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface ActionButtonsProps {
  onGetStarted?: () => void;
}

export default function ActionButtons({ onGetStarted }: ActionButtonsProps) {
  return (
    <View style={styles.bottomRow}>
      <TouchableOpacity style={styles.learnMoreButton} onPress={onGetStarted}>
        <Text style={styles.learnMoreText}>Get Started</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.arrowButton} onPress={onGetStarted}>
        <View style={styles.iconContainer}>
          <View style={styles.arrowStem} />
          <View style={styles.arrowHead} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  learnMoreButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
  },
  arrowButton: {
    width: 65,
    height: 65,
    backgroundColor: '#ffffff',
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // Small nudge to make it visually perfectly centered
    transform: [{ translateX: -2 }],
  },
  arrowStem: {
    width: 14,
    height: 2.5,
    backgroundColor: '#000000',
    borderRadius: 1.25,
  },
  arrowHead: {
    width: 12,
    height: 12,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }],
    marginLeft: -7,
    borderRadius: 1,
  },
});
