import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';
import { FLASH_DEAL_PRODUCTS, type MockProduct } from '@/data/mockData';

const CARD_W = 116;
const END_TIME = Date.now() + 7 * 3600 * 1000 + 23 * 60 * 1000 + 41 * 1000;

function pad(n: number) { return String(n).padStart(2, '0'); }

function useCountdown(end: number) {
  const calc = () => {
    const diff = Math.max(0, end - Date.now());
    const s = Math.floor(diff / 1000);
    return { h: Math.floor(s / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Digit({ value }: { value: number }) {
  return (
    <View style={styles.digit}>
      <Text style={styles.digitText}>{pad(value)}</Text>
    </View>
  );
}

function Sep() {
  return <Text style={styles.sep}>:</Text>;
}

function DealCard({ item }: { item: MockProduct }) {
  const pct = Math.round(100 - (item.price_sale / item.price_original) * 100);
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.75}>
      <View style={[styles.cardImg, { backgroundColor: item.bgColor }]}>
        <Text style={styles.cardEmoji}>{item.emoji}</Text>
        <View style={styles.pctBadge}>
          <Text style={styles.pctText}>-{pct}%</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardPrice}>
          <Text style={styles.curr}>$</Text>
          {item.price_sale.toFixed(2)}
        </Text>
        <Text style={styles.cardOrig}>${item.price_original.toFixed(2)}</Text>
        {item.sold && <Text style={styles.cardSold}>{item.sold}</Text>}
      </View>
    </TouchableOpacity>
  );
}

export default function FlashDeals() {
  const { h, m, s } = useCountdown(END_TIME);

  return (
    <View style={styles.container}>
      {/* Orange header band */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="flash" size={16} color={Colors.white} />
          <Text style={styles.headerTitle}>FLASH DEALS</Text>
        </View>
        <View style={styles.timerRow}>
          <Text style={styles.endsIn}>Ends in</Text>
          <Digit value={h} /><Sep /><Digit value={m} /><Sep /><Digit value={s} />
        </View>
        <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.75}>
          <Text style={styles.seeAllText}>See all</Text>
          <Ionicons name="chevron-forward" size={12} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Deal cards */}
      <FlatList
        data={FLASH_DEAL_PRODUCTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DealCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
    gap: Spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginLeft: Spacing.sm,
  },
  endsIn: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    marginRight: 2,
  },
  digit: {
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: 'center',
  },
  digitText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  sep: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 13,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  seeAllText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  card: {
    width: CARD_W,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  cardImg: {
    width: CARD_W,
    height: CARD_W,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 42,
  },
  pctBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: Colors.error,
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  pctText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  cardInfo: {
    padding: Spacing.sm,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
    lineHeight: 20,
  },
  curr: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardOrig: {
    fontSize: 11,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  cardSold: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
});
