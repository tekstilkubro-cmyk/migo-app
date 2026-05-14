import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Category {
  id: string;
  name: string;
  emoji: string;
  bg: string;
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'Women',       emoji: '👗', bg: '#FFEEF5' },
  { id: '2', name: 'Men',         emoji: '👔', bg: '#EEF3FF' },
  { id: '3', name: 'Electronics', emoji: '📱', bg: '#EEF3FF' },
  { id: '4', name: 'Home',        emoji: '🏠', bg: '#EFFFEE' },
  { id: '5', name: 'Beauty',      emoji: '💄', bg: '#FFF0F9' },
  { id: '6', name: 'Kids',        emoji: '🧸', bg: '#FFF9EE' },
  { id: '7', name: 'Sports',      emoji: '⚽', bg: '#EEFAFF' },
  { id: '8', name: 'Garden',      emoji: '🌿', bg: '#EEFFF0' },
  { id: '9', name: 'Jewelry',     emoji: '💍', bg: '#F9EEFF' },
  { id: '10', name: 'Baby',       emoji: '🍼', bg: '#FFF9EE' },
];

const ITEM_WIDTH = SCREEN_WIDTH / 5.5;

function CategoryItem({ item }: { item: Category }) {
  return (
    <TouchableOpacity style={[styles.item, { width: ITEM_WIDTH }]} activeOpacity={0.7}>
      <View style={[styles.circle, { backgroundColor: item.bg }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <Text style={styles.label} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );
}

export default function CategoryRow() {
  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    borderBottomWidth: 6,
    borderBottomColor: Colors.surface,
  },
  list: {
    paddingHorizontal: Spacing.sm,
    gap: 4,
  },
  item: {
    alignItems: 'center',
    gap: 5,
    paddingVertical: 2,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
});
