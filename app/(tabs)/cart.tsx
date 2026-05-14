import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

export default function CartScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>0 items</Text>
        </View>
      </View>

      {/* Empty state */}
      <View style={styles.empty}>
        <View style={styles.iconCircle}>
          <Ionicons name="cart-outline" size={56} color={Colors.primary} />
        </View>

        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySub}>
          Looks like you haven't added{'\n'}anything to your cart yet.
        </Text>

        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => router.push('/')}
          activeOpacity={0.85}
        >
          <Ionicons name="storefront-outline" size={18} color={Colors.white} />
          <Text style={styles.shopBtnText}>Start Shopping</Text>
        </TouchableOpacity>

        {/* Feature hints */}
        <View style={styles.hints}>
          {[
            { icon: 'shield-checkmark-outline', text: 'Secure checkout' },
            { icon: 'car-outline', text: 'Free shipping over $29' },
            { icon: 'return-down-back-outline', text: 'Easy returns' },
          ].map((h) => (
            <View key={h.text} style={styles.hint}>
              <Ionicons name={h.icon as any} size={16} color={Colors.primary} />
              <Text style={styles.hintText}>{h.text}</Text>
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
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  headerBadge: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  headerBadgeText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.base,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFF2E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  shopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: Radius.button,
    paddingHorizontal: 28,
    paddingVertical: 13,
    marginTop: Spacing.sm,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  shopBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  hints: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
    alignSelf: 'stretch',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  hintText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
