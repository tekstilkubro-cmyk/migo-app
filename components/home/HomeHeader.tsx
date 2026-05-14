import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

export default function HomeHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        {/* Logo */}
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>MIGO</Text>
        </View>

        {/* Search bar */}
        <TouchableOpacity style={styles.search} activeOpacity={0.85}>
          <Ionicons name="search-outline" size={15} color="#AAAAAA" />
          <Text style={styles.searchText}>Search products, brands...</Text>
          <View style={styles.divider} />
          <Ionicons name="camera-outline" size={19} color="#888888" />
        </TouchableOpacity>

        {/* Right icons */}
        <View style={styles.icons}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Promo strip */}
      <View style={styles.promo}>
        <Ionicons name="flame" size={12} color="#FFD700" />
        <Text style={styles.promoText} numberOfLines={1}>
          🎁 New user deal · 90% OFF + Free Shipping on first order
        </Text>
        <Ionicons name="chevron-forward" size={12} color="rgba(255,255,255,0.6)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingBottom: 10,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoWrap: {
    width: 52,
  },
  logo: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 2,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.button,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 8,
    gap: 6,
  },
  searchText: {
    flex: 1,
    fontSize: 12.5,
    color: '#BBBBBB',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: '#E0E0E0',
  },
  icons: {
    flexDirection: 'row',
    gap: 2,
  },
  iconBtn: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  promoText: {
    flex: 1,
    fontSize: 11,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '500',
  },
});
