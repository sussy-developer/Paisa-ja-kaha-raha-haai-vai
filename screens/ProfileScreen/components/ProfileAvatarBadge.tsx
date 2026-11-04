import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileAvatarBadgeProps {
  userName: string;
}

export default function ProfileAvatarBadge({ userName }: ProfileAvatarBadgeProps) {
  const initial = (userName.trim().charAt(0) || 'U').toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          <Text style={styles.initialText}>{initial}</Text>
        </View>
        <View style={styles.badgeIndicator}>
          <Ionicons name="sparkles" size={14} color="#FFFFFF" />
        </View>
      </View>
      <Text style={styles.displayName}>{userName || 'User'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#FF5E1E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5E1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  initialText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
  },
  badgeIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#18181B',
    borderWidth: 2,
    borderColor: '#FF5E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});
