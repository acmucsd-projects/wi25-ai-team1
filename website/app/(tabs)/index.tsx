import React from 'react';
import { SafeAreaView, View, Image, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MemberCard from '@/components/MemberCard';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, Typography, GlobalStyles } from '../styles/theme';

const members = [
  { name: 'Alan', image: require('@/assets/images/alan.jpg') },
  { name: 'Reagan', image: require('@/assets/images/reagan.jpg') },
  { name: 'Isha', image: require('@/assets/images/isha.jpg') },
  { name: 'Jamera', image: require('@/assets/images/jamera.jpg') },
  { name: 'Jaden', image: require('@/assets/images/jaden.jpg') },
];

export default function App() {
  return (
    <LinearGradient colors={[Colors.primaryDark, Colors.primary]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.logoRow}>
            <Image source={require('@/assets/images/acm-ucsd-logo.png')} style={styles.logo} resizeMode="contain" />
            <Image source={require('@/assets/images/acm-projects-ucsd-logo.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <ThemedText style={styles.title}>AI Team 1</ThemedText>
          <ThemedText style={styles.subtitle}>Season Prediction Showcase</ThemedText>

          <ThemedText style={GlobalStyles.sectionTitle}>Who Are We?</ThemedText>
          <ThemedText style={GlobalStyles.paragraph}>
            TODO
          </ThemedText>

          <View style={styles.grid}>
            {members.map((m) => (
              <MemberCard key={m.name} name={m.name} image={m.image} />
            ))}
          </View>

          <ThemedText style={GlobalStyles.sectionTitle}>Why This Project?</ThemedText>
          <ThemedText style={GlobalStyles.paragraph}>
            TODO
          </ThemedText>

          <ThemedText style={GlobalStyles.sectionTitle}>What’s Next?</ThemedText>
          <ThemedText style={GlobalStyles.paragraph}>
            TODO
          </ThemedText>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  logoRow: { flexDirection: 'row', marginBottom: Spacing.lg },
  logo: { width: 100, height: 100, marginHorizontal: Spacing.sm },
  title: { ...Typography.title, marginBottom: Spacing.xs, textAlign: 'center' },
  subtitle: { ...Typography.subtitle, marginBottom: Spacing.lg, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: Spacing.md },
});
