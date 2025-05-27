import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

type Props = { name: string; image: any };

export default function MemberCard({ name, image }: Props) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.avatar} />
      <ThemedText style={styles.name}>{name}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, backgroundColor: '#ffffff15', width: 140, margin: 8 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  name: { color: '#fff', fontWeight: '600' },
});
