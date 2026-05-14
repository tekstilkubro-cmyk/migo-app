import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { BEST_SELLERS } from '@/data/mockData';
import ProductCard from '@/components/shared/ProductCard';

export default function BestSellers() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.accentBar} />
          <Text style={styles.title}>Best Sellers</Text>
        </View>
        <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
          <Text style={styles.seeAll}>See all</Text>
          <Ionicons name="chevron-forward" size={13} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={BEST_SELLERS}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <ProductCard product={item} />}
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  accentBar: {
    width: 3,
    height: 16,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  seeAll: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  grid: {
    gap: 3,
  },
  row: {
    gap: 3,
  },
});
