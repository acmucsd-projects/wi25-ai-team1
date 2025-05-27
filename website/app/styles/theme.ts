import { StyleSheet } from 'react-native';

export const Colors = {
  primaryDark: '#0B1B2B',
  primary: '#123C63',
  accent: '#0073CF',
  light: '#ffffff',
  mutedLight: '#ffffff90',
  mutedDark: '#ffffff15',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Typography = StyleSheet.create({
  title: { fontSize: 34, fontWeight: '700', color: Colors.light },
  subtitle: { fontSize: 18, fontWeight: '600', color: Colors.light },
  body: { fontSize: 16, fontWeight: '400', color: Colors.light },
});

export const Shadows = {
  card: {
    shadowColor: Colors.light,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
};

export const GlobalStyles = StyleSheet.create({
  centeredSafeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.subtitle,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  paragraph: {
    ...Typography.body,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 600,
  },
});