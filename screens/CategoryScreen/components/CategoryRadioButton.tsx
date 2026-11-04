import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CategoryRadioButtonProps {
  isSelected: boolean;
}

export default function CategoryRadioButton({ isSelected }: CategoryRadioButtonProps) {
  if (isSelected) {
    return (
      <View style={styles.selectedOuter}>
        <View style={styles.selectedInnerDot} />
      </View>
    );
  }

  return <View style={styles.unselectedRing} />;
}

const styles = StyleSheet.create({
  selectedOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF6F1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFE5D4',
  },
  unselectedRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#3F3F46',
  },
});
