import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GreetingHeaderProps {
  greeting?: string;
  userName?: string;
  subtitle?: string;
  onNotificationPress?: () => void;
}

export default function GreetingHeader({
  greeting = 'Good Morning,',
  userName = 'User',
  subtitle = "Here's your financial overview\nfor this month.",
  onNotificationPress,
}: GreetingHeaderProps) {
  const bellScale = useRef(new Animated.Value(1)).current;

  const handlePressBell = () => {
    Animated.sequence([
      Animated.timing(bellScale, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(bellScale, {
        toValue: 1.15,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bellScale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    onNotificationPress?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.nameSection}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <View style={styles.nameRow}>
            <Text style={styles.userNameText}>{userName}</Text>
          </View>
        </View>

        <Animated.View style={{ transform: [{ scale: bellScale }] }}>
          <TouchableOpacity
            style={styles.bellButton}
            onPress={handlePressBell}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            <View style={styles.onlineDot} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Text style={styles.subtitleText}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameSection: {
    flex: 1,
  },
  greetingText: {
    color: '#9E9EA7',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    position: 'relative',
  },
  onlineDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF5E1E',
    borderWidth: 1.5,
    borderColor: '#0A0A0C',
  },
  subtitleText: {
    color: '#8E8E96',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    fontWeight: '400',
  },
});
