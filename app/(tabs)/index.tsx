import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/colors';
import HomeHeader from '@/components/home/HomeHeader';
import BannerCarousel from '@/components/home/BannerCarousel';
import CategoryRow from '@/components/home/CategoryRow';
import FlashDeals from '@/components/home/FlashDeals';
import BestSellers from '@/components/home/BestSellers';

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <HomeHeader />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <BannerCarousel />
        <CategoryRow />
        <FlashDeals />
        <BestSellers />
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
});
