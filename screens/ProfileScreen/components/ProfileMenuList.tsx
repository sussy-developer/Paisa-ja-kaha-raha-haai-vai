import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileMenuItem from './ProfileMenuItem';
import { PROFILE_MENU_ITEMS, ProfileMenuItemData } from '../types';

interface ProfileMenuListProps {
  onItemPress: (item: ProfileMenuItemData) => void;
}

export default function ProfileMenuList({ onItemPress }: ProfileMenuListProps) {
  return (
    <View style={styles.container}>
      {PROFILE_MENU_ITEMS.map((item, index) => {
        const isLast = index === PROFILE_MENU_ITEMS.length - 1;
        return (
          <ProfileMenuItem
            key={item.id}
            item={item}
            onPress={onItemPress}
            showDivider={!isLast}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
});
