import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
});
