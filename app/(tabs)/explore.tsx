import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

const { width: SW } = Dimensions.get('window');
const COL = 3;
const CARD = (SW - Spacing.base * 2 - Spacing.sm * (COL - 1)) / COL;

const CATS = [
  { id: '1',  name: "Women's",     emoji: '👗', bg: '#FFEEF5' },
  { id: '2',  name: "Men's",       emoji: '👔', bg: '#EEF3FF' },
  { id: '3',  name: 'Electronics', emoji: '📱', bg: '#EEF3FF' },
  { id: '4',  name: 'Home',        emoji: '🏠', bg: '#EFFFEE' },
  { id: '5',  name: 'Beauty',      emoji: '💄', bg: '#FFF0F9' },
  { id: '6',  name: 'Kids',        emoji: '🧸', bg: '#FFF9EE' },
  { id: '7',  name: 'Sports',      emoji: '⚽', bg: '#EEFAFF' },
  { id: '8',  name: 'Jewelry',     emoji: '💍', bg: '#F9EEFF' },
  { id: '9',  name: 'Health',      emoji: '💊', bg: '#EFFFEE' },
  { id: '10', name: 'Pets',        emoji: '🐾', bg: '#FFF9EE' },
  { id: '11', name: 'Automotive',  emoji: '🚗', bg: '#EEF3FF' },
  { id: '12', name: 'Books',       emoji: '📚', bg: '#FFF0F5' },
  { id: '13', name: 'Garden',      emoji: '🌿', bg: '#EEFFF0' },
  { id: '14', name: 'Baby',        emoji: '🍼', bg: '#FFF9EE' },
  { id: '15', name: 'Outdoor',     emoji: '🏕️', bg: '#EEFAFF' },
  { id: '16', name: 'Food',        emoji: '🍱', bg: '#FFFBEE' },
  { id: '17', name: 'Tools',       emoji: '🔧', bg: '#F0F0F0' },
  { id: '18', name: 'Art & Craft', emoji: '🎨', bg: '#FFF0F9' },
];

interface Cat { id: string; name: string; emoji: string; bg: string; }

function CatCard({ item }: { item: Cat }) {
  return (
    <TouchableOpacity style={[styles.card, { width: CARD }]} activeOpacity={0.75}>
      <View style={[styles.cardImg, { backgroundColor: item.bg }]}>
        <Text style={styles.cardEmoji}>{item.emoji}</Text>
      </View>
      <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );
}

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={16} color="#AAAAAA" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            placeholderTextColor="#BBBBBB"
          />
        </View>
      </View>

      {/* Grid */}
      <FlatList
        data={CATS}
        numColumns={COL}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CatCard item={item} />}
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>All Categories</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
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
  searchWrap: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.base,
    paddingBottom: 12,
    paddingTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: Radius.button,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    padding: 0,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  grid: {
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  row: {
    gap: Spacing.sm,
    justifyContent: 'flex-start',
  },
  card: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardImg: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmoji: { fontSize: 34 },
  cardName: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
    lineHeight: 14,
  },
});
