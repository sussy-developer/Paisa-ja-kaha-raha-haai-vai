import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface InputFieldProps {
  iconName: keyof typeof Feather.glyphMap;
  placeholder: string;
  isPassword?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
}

export default function InputField({ iconName, placeholder, isPassword, value, onChangeText, error }: InputFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, error ? styles.containerError : null]}>
        <Feather name={iconName} size={20} color={error ? "#ff4d4d" : "rgba(255,255,255,0.6)"} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={error ? "rgba(255,77,77,0.4)" : "rgba(255,255,255,0.4)"}
          secureTextEntry={isPassword && !showPassword}
          value={value}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
          importantForAutofill="no"
          autoComplete="off"
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color={error ? "#ff4d4d" : "rgba(255,255,255,0.4)"} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    height: 60,
    paddingHorizontal: 16,
  },
  containerError: {
    borderColor: '#ff4d4d',
    backgroundColor: 'rgba(255,77,77,0.05)',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  }
});
