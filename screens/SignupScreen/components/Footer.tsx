import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FooterProps {
  text: string;
  linkText: string;
  onLinkPress?: () => void;
}

export default function Footer({ text, linkText, onLinkPress }: FooterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text} </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={onLinkPress}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  link: {
    color: '#E84C22',
    fontSize: 14,
    fontWeight: '700',
  }
});
