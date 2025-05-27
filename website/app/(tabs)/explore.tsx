import React, { useMemo, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import fileJson from '../../assets/file.json';
import { Colors, Spacing, Typography, Shadows } from '../styles/theme';

//import json
const matrix = fileJson as { columns: string[]; data: (string | number)[][] };
const colIndex = {
  Team: matrix.columns.indexOf('Team'),
  PredictedPct: matrix.columns.indexOf('PredictedPct'),
  ActualPct: matrix.columns.indexOf('ActualPct'),
};
const raw = matrix.data.map((row, idx) => ({
  id: String(idx),
  Team: row[colIndex.Team] as string,
  PredictedPct: row[colIndex.PredictedPct] as number,
  ActualPct: row[colIndex.ActualPct] as number,
}));

//constants
const cols = [
  { key: 'Team', label: 'Team', flex: 3 },
  { key: 'PredictedPct', label: 'Predicted %', flex: 1 },
  { key: 'ActualPct', label: 'Actual %', flex: 1 },
] as const;

type SortKey = (typeof cols)[number]['key'];

//table
export default function PredictionsScreen() {
  const [sortKey, setSortKey] = useState<SortKey>('PredictedPct');
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    const data = [...raw];
    data.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string') return asc ? (aVal as string).localeCompare(bVal as string) : (bVal as string).localeCompare(aVal as string);
      return asc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return data;
  }, [sortKey, asc]);

  const avgError = useMemo(() => raw.reduce((acc, r) => acc + Math.abs(r.PredictedPct - r.ActualPct), 0) / raw.length * 100, []);

  const bestTeam = useMemo(() => raw.reduce((prev, cur) => Math.abs(cur.PredictedPct - cur.ActualPct) < Math.abs(prev.PredictedPct - prev.ActualPct) ? cur : prev), []);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setAsc(!asc); else { setSortKey(key); setAsc(key === 'Team'); }
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {cols.map((c, i) => (
        <Pressable key={c.key} style={[styles.cell, { flex: c.flex }, i < cols.length - 1 && styles.cellRightBorder]} onPress={() => toggleSort(c.key)}>
          <Text style={styles.headerText}>{c.label}{sortKey === c.key ? (asc ? ' ▲' : ' ▼') : ''}</Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.pageTitle}>2025 NCAA Men’s Volleyball • Prediction Accuracy</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{avgError.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>Average Error</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue} numberOfLines={1}>{bestTeam.Team}</Text>
          <Text style={styles.statLabel}>Most Accurate</Text>
        </View>
      </View>

      <View style={styles.tableCard}>
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          stickyHeaderIndices={[0]}
          renderItem={({ item, index }) => (
            <View style={[styles.row, index % 2 ? styles.alt : null]}>
              <Text style={[styles.cell, { flex: 3 }, styles.cellRightBorder]} numberOfLines={1} ellipsizeMode="tail">{item.Team}</Text>
              <Text style={[styles.cell, { flex: 1 }, styles.cellRightBorder]}>{(item.PredictedPct * 100).toFixed(1)}%</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{(item.ActualPct * 100).toFixed(1)}%</Text>
            </View>
          )}
          style={{ maxHeight: '65%' }}
        />
      </View>
    </SafeAreaView>
  );
}

//styles
const borderColor = Colors.mutedLight;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light, padding: Spacing.lg },
  pageTitle: { ...Typography.title, fontSize: 24, color: Colors.primaryDark, textAlign: 'center', marginBottom: Spacing.lg },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: Spacing.lg, borderBlockColor: 'blue' },
  statCard: { backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg, minWidth: 140, alignItems: 'center', ...Shadows.card },
  statValue: { ...Typography.subtitle, fontSize: 20, color: Colors.light },
  statLabel: { ...Typography.body, fontSize: 12, color: Colors.mutedLight },
  tableCard: { flex: 1, backgroundColor: Colors.light, borderRadius: 16, overflow: 'hidden', ...Shadows.card },
  headerRow: { flexDirection: 'row', backgroundColor: Colors.primaryDark, borderBottomWidth: 1, borderColor },
  headerText: { ...Typography.subtitle, fontSize: 14, color: Colors.light, textAlign: 'center' },
  row: { flexDirection: 'row', paddingVertical: 6, paddingHorizontal: Spacing.sm, borderBottomWidth: 1, borderColor },
  alt: { backgroundColor: Colors.mutedLight },
  cell: { ...Typography.body, color: Colors.primaryDark, textAlign: 'center', paddingHorizontal: 4 },
  cellRightBorder: { borderRightWidth: 1, borderColor },
});
