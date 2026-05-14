import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';
import type { MockProduct } from '@/data/mockData';

const SCREEN_W = Dimensions.get('window').width;
export const CARD_WIDTH = (SCREEN_W - 3) / 2;

interface Props {
  product: MockProduct;
  onPress?: () => void;
}

function fmtCount(n: number) {
  if (n >= 10000) return `${Math.floor(n / 1000)}K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function ProductCard({ product, onPress }: Props) {
  const pct = Math.round(100 - (product.price_sale / product.price_original) * 100);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Product image area */}
      <View style={[styles.img, { backgroundColor: product.bgColor }]}>
        <Text style={styles.emoji}>{product.emoji}</Text>
        {/* Discount badge — top left */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>-{pct}%</Text>
        </View>
        {/* Best seller tag — bottom left */}
        {product.tag && (
          <View style={styles.tagWrap}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

        {/* Price row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            <Text style={styles.dollar}>$</Text>
            {product.price_sale.toFixed(2)}
          </Text>
          <Text style={styles.orig}>${product.price_original.toFixed(2)}</Text>
        </View>

        {/* Sold count */}
        <Text style={styles.sold}>
          {product.sold ?? `${fmtCount(product.rating_count)} sold`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    marginBottom: 3,
  },
  img: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 58,
  },
  badge: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    backgroundColor: Colors.error,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  tagWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,107,0,0.85)',
    paddingVertical: 3,
  },
  tagText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
  },
  info: {
    padding: Spacing.sm,
    paddingTop: 6,
    gap: 2,
  },
  name: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
    marginTop: 1,
  },
  price: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.primary,
  },
  dollar: {
    fontSize: 12,
    fontWeight: '700',
  },
  orig: {
    fontSize: 11,
    color: '#AAAAAA',
    textDecorationLine: 'line-through',
  },
  sold: {
    fontSize: 11,
    color: '#AAAAAA',
  },
});
