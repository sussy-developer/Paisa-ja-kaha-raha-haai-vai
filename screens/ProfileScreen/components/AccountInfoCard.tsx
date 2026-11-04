import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AccountInfoCardProps {
  email: string;
}

export default function AccountInfoCard({ email }: AccountInfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>Account Details</Text>

      {/* Email Row */}
      <View style={styles.infoRow}>
        <View style={styles.leftSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="mail-outline" size={18} color="#60A5FA" />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.itemTitle}>Email Address</Text>
            <Text style={styles.itemValue}>{email || 'Not specified'}</Text>
          </View>
        </View>

        <View style={styles.verifiedTag}>
          <Ionicons name="checkmark-circle" size={14} color="#10B981" style={styles.verifiedIcon} />
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Security Status Row */}
      <View style={styles.infoRow}>
        <View style={styles.leftSection}>
          <View style={[styles.iconCircle, styles.securityCircle]}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#FBBF24" />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.itemTitle}>Authentication</Text>
            <Text style={styles.itemValue}>Amazon Cognito User Pool</Text>
          </View>
        </View>

        <View style={styles.activeTag}>
          <Text style={styles.activeTagText}>Active</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181B',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 20,
  },
  cardLabel: {
    color: '#8E8E96',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(96, 165, 250, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  securityCircle: {
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
  },
  textColumn: {
    flex: 1,
  },
  itemTitle: {
    color: '#8E8E96',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  verifiedIcon: {
    marginRight: 4,
  },
  verifiedText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  activeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  activeTagText: {
    color: '#A0A0A5',
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    marginVertical: 12,
  },
});
