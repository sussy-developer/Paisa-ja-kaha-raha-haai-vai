import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileUserInfoProps {
  userName: string;
  userEmail: string;
  onEditPress?: () => void;
}

export default function ProfileUserInfo({
  userName,
  userEmail,
  onEditPress,
}: ProfileUserInfoProps) {
  const initial = (userName.trim().charAt(0) || 'U').toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        <Text style={styles.initialText}>{initial}</Text>
      </View>

      <View style={styles.textColumn}>
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>{userName || 'User'}</Text>
          {onEditPress && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={onEditPress}
              activeOpacity={0.7}
            >
              <Ionicons name="pencil" size={14} color="#FF6F1E" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.emailText} numberOfLines={1}>
          {userEmail || 'user@example.com'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  initialText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '600',
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  editButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 111, 30, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 111, 30, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  emailText: {
    color: '#8E8E96',
    fontSize: 14,
    fontWeight: '400',
  },
});
