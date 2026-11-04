import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabKey } from '../types';

interface BottomNavigationBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function BottomNavigationBar({
  activeTab,
  onTabChange,
}: BottomNavigationBarProps) {
  const tabs: { key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { key: 'expenses', label: 'Expenses', icon: 'list-outline', activeIcon: 'list' },
    { key: 'analytics', label: 'Analytics', icon: 'stats-chart-outline', activeIcon: 'stats-chart' },
    { key: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const iconColor = isActive ? '#FF6F1E' : '#8E8E96';
        const iconName = isActive ? tab.activeIcon : tab.icon;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.7}
          >
            <Ionicons name={iconName} size={22} color={iconColor} />
            <Text style={[styles.tabLabel, { color: iconColor, fontWeight: isActive ? '600' : '400' }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 64,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
});
