import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { useCart } from '@/hooks/useCart';

export default function CartScreen() {
  const { items } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart ({items.length})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.base },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
});
