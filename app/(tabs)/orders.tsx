import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

const TABS = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'] as const;
type OrderTab = typeof TABS[number];

export default function OrdersScreen() {
  const [active, setActive] = useState<OrderTab>('All');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Status tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={styles.tabList}
      >
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, active === t && styles.tabActive]}
            onPress={() => setActive(t)}
            activeOpacity={0.75}
          >
            <Text style={[styles.tabText, active === t && styles.tabTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Empty state */}
      <View style={styles.empty}>
        <View style={styles.illustrationWrap}>
          <View style={styles.box1} />
          <View style={styles.box2} />
          <View style={styles.box3} />
          <Ionicons
            name="cube-outline"
            size={52}
            color={Colors.primary}
            style={styles.boxIcon}
          />
        </View>

        <Text style={styles.emptyTitle}>No orders yet</Text>
        <Text style={styles.emptySub}>
          When you place an order, it will{'\n'}show up here for easy tracking.
        </Text>

        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => router.push('/')}
          activeOpacity={0.85}
        >
          <Text style={styles.shopBtnText}>Explore Products</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.white} />
        </TouchableOpacity>

        {/* Order steps */}
        <View style={styles.steps}>
          {[
            { icon: 'bag-add-outline', label: 'Add to cart' },
            { icon: 'card-outline', label: 'Checkout' },
            { icon: 'cube-outline', label: 'Track here' },
          ].map((step, i) => (
            <View key={step.label} style={styles.step}>
              <View style={styles.stepCircle}>
                <Ionicons name={step.icon as any} size={20} color={Colors.primary} />
              </View>
              {i < 2 && <View style={styles.stepLine} />}
              <Text style={styles.stepLabel}>{step.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  tabScroll: { backgroundColor: Colors.white, flexGrow: 0 },
  tabList: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
    gap: Spacing.sm,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  tabActive: {
    borderColor: Colors.primary,
    backgroundColor: '#FFF2E8',
  },
  tabText: { fontSize: 13, fontWeight: '600', color: Colors.textMuted },
  tabTextActive: { color: Colors.primary },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.base,
  },
  illustrationWrap: {
    width: 110,
    height: 110,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  box1: {
    position: 'absolute', width: 70, height: 70,
    backgroundColor: '#FFE5CC', borderRadius: 12,
    transform: [{ rotate: '-12deg' }],
  },
  box2: {
    position: 'absolute', width: 70, height: 70,
    backgroundColor: '#FFD0A0', borderRadius: 12,
    transform: [{ rotate: '8deg' }],
  },
  box3: {
    position: 'absolute', width: 70, height: 70,
    backgroundColor: '#FFF2E8', borderRadius: 12,
  },
  boxIcon: { position: 'absolute' },
  emptyTitle: {
    fontSize: 20, fontWeight: '800',
    color: Colors.textPrimary, textAlign: 'center',
  },
  emptySub: {
    fontSize: 14, color: Colors.textMuted,
    textAlign: 'center', lineHeight: 20,
  },
  shopBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: Radius.button,
    paddingHorizontal: 28, paddingVertical: 13,
    marginTop: Spacing.sm,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  shopBtnText: { color: Colors.white, fontSize: 15, fontWeight: '700' },
  steps: {
    marginTop: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    alignSelf: 'stretch',
  },
  step: { alignItems: 'center', flex: 1, gap: 6 },
  stepCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#FFF2E8',
    justifyContent: 'center', alignItems: 'center',
  },
  stepLine: {
    position: 'absolute',
    top: 22, right: -Spacing.base,
    width: '60%', height: 1.5,
    backgroundColor: Colors.border,
  },
  stepLabel: {
    fontSize: 11, color: Colors.textSecondary,
    fontWeight: '600', textAlign: 'center',
  },
});
