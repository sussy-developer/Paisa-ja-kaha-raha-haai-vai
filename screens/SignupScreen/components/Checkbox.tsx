import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Checkbox({ checked, onToggle }: { checked: boolean, onToggle: () => void }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={onToggle} activeOpacity={0.8}>
        {checked && <Feather name="check" size={14} color="#E84C22" />}
      </TouchableOpacity>
      <Text style={styles.text}>
        I agree to the <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 13,
  },
  link: {
    color: '#E84C22',
    fontWeight: '600',
  }
});
