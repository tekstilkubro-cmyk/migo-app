import { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

const { width: SW } = Dimensions.get('window');
const H = 172;
const INTERVAL = 4000;

interface Banner { id: string; tag: string; headline: string; sub: string; cta: string; bg: string; dark: string; emoji: string; }

const BANNERS: Banner[] = [
  { id: '1', tag: '🔥 LIMITED TIME', headline: 'UP TO 90% OFF', sub: 'Thousands of products — today only', cta: 'Shop Now', bg: '#FF6B00', dark: '#D45500', emoji: '🛍️' },
  { id: '2', tag: '📦 FREE SHIPPING', headline: 'ORDERS OVER $29', sub: 'No code · Applied at checkout', cta: 'Explore', bg: '#5B4FE8', dark: '#3D33C4', emoji: '🚀' },
  { id: '3', tag: '✨ NEW ARRIVALS', headline: 'FRESH STYLES IN', sub: 'New items added every day', cta: 'See New', bg: '#00A86B', dark: '#007A4F', emoji: '🌟' },
  { id: '4', tag: '⚡ FLASH SALE', headline: 'ENDS TONIGHT', sub: 'Grab it before stock runs out', cta: 'Get Deal', bg: '#D61F69', dark: '#A01450', emoji: '💥' },
];

function Slide({ item }: { item: Banner }) {
  return (
    <View style={[styles.slide, { backgroundColor: item.bg }]}>
      <View style={[styles.blob1, { backgroundColor: item.dark }]} />
      <View style={[styles.blob2, { backgroundColor: item.dark }]} />
      <View style={styles.content}>
        <View style={styles.textSide}>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <Text style={styles.headline}>{item.headline}</Text>
          <Text style={styles.sub}>{item.sub}</Text>
          <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.85}>
            <Text style={styles.ctaText}>{item.cta}  →</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
    </View>
  );
}

export default function BannerCarousel() {
  const [idx, setIdx] = useState(0);
  const listRef = useRef<FlatList>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const opacity = useRef(new Animated.Value(1)).current;

  const goTo = (next: number) => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 0.75, duration: 120, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    listRef.current?.scrollToIndex({ index: next, animated: true });
    setIdx(next);
  };

  const resetTimer = (current: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % BANNERS.length;
        goTo(next);
        return next;
      });
    }, INTERVAL);
  };

  useEffect(() => {
    resetTimer(0);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <View style={styles.wrap}>
      <Animated.View style={{ opacity }}>
        <FlatList
          ref={listRef}
          data={BANNERS}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const i = Math.round(e.nativeEvent.contentOffset.x / SW);
            setIdx(i);
            resetTimer(i);
          }}
          renderItem={({ item }) => <Slide item={item} />}
          keyExtractor={(item) => item.id}
          getItemLayout={(_, i) => ({ length: SW, offset: SW * i, index: i })}
        />
      </Animated.View>

      {/* Dots */}
      <View style={styles.dots}>
        {BANNERS.map((_, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, i === idx && styles.dotOn]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative' },
  slide: { width: SW, height: H, overflow: 'hidden' },
  blob1: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    right: -50, top: -60, opacity: 0.4,
  },
  blob2: {
    position: 'absolute', width: 130, height: 130, borderRadius: 65,
    right: 70, bottom: -45, opacity: 0.3,
  },
  content: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22, paddingVertical: Spacing.base,
  },
  textSide: { flex: 1, gap: 4 },
  tagPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderRadius: Radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  tagText: { fontSize: 10, color: 'rgba(255,255,255,0.92)', fontWeight: '600' },
  headline: {
    fontSize: 27, fontWeight: '900', color: Colors.white,
    letterSpacing: 0.3, lineHeight: 31,
  },
  sub: { fontSize: 12, color: 'rgba(255,255,255,0.82)', lineHeight: 16 },
  ctaBtn: {
    alignSelf: 'flex-start', marginTop: 6,
    backgroundColor: Colors.white,
    borderRadius: Radius.button,
    paddingHorizontal: 14, paddingVertical: 7,
  },
  ctaText: { fontSize: 12, fontWeight: '800', color: Colors.primary },
  emoji: { fontSize: 66, marginLeft: 8 },
  dots: {
    position: 'absolute', bottom: 10, alignSelf: 'center',
    flexDirection: 'row', gap: 4,
  },
  dot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotOn: { width: 22, backgroundColor: Colors.white },
});
