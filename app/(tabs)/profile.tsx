import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

type IonName = React.ComponentProps<typeof Ionicons>['name'];

interface MenuItem { icon: IonName; label: string; badge?: string; danger?: boolean; }
interface MenuSection { title: string; items: MenuItem[]; }

const MENU: MenuSection[] = [
  {
    title: 'My Account',
    items: [
      { icon: 'bag-outline', label: 'My Orders' },
      { icon: 'heart-outline', label: 'Wishlist' },
      { icon: 'star-outline', label: 'My Reviews' },
      { icon: 'ticket-outline', label: 'My Coupons', badge: '3' },
      { icon: 'card-outline', label: 'Payment Methods' },
      { icon: 'location-outline', label: 'Delivery Addresses' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Help Center' },
      { icon: 'return-down-back-outline', label: 'Returns & Refunds' },
      { icon: 'chatbubble-ellipses-outline', label: 'Contact Us' },
    ],
  },
  {
    title: 'App',
    items: [
      { icon: 'settings-outline', label: 'Settings' },
      { icon: 'information-circle-outline', label: 'About MIGO' },
      { icon: 'star-half-outline', label: 'Rate the App' },
      { icon: 'log-out-outline', label: 'Log Out', danger: true },
    ],
  },
];

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
      <View style={[styles.menuIcon, item.danger && styles.menuIconDanger]}>
        <Ionicons
          name={item.icon}
          size={20}
          color={item.danger ? Colors.error : Colors.primary}
        />
      </View>
      <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
        {item.label}
      </Text>
      {item.badge && (
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      <Ionicons
        name="chevron-forward"
        size={16}
        color={item.danger ? Colors.error : '#CCCCCC'}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Orange header card */}
        <View style={styles.profileCard}>
          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={34} color="#CCCCCC" />
            </View>
            <View style={styles.avatarBadge}>
              <Ionicons name="camera" size={11} color={Colors.white} />
            </View>
          </View>

          {/* Guest text */}
          <View style={styles.profileText}>
            <Text style={styles.guestName}>Guest User</Text>
            <Text style={styles.guestSub}>Sign in for exclusive deals & tracking</Text>
          </View>

          {/* Auth buttons */}
          <View style={styles.authRow}>
            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.85}>
              <Text style={styles.loginBtnText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerBtn} activeOpacity={0.85}>
              <Text style={styles.registerBtnText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick action tiles */}
        <View style={styles.quickActions}>
          {[
            { icon: 'bag-outline' as IonName, label: 'Orders' },
            { icon: 'heart-outline' as IonName, label: 'Wishlist' },
            { icon: 'ticket-outline' as IonName, label: 'Coupons' },
            { icon: 'time-outline' as IonName, label: 'History' },
          ].map((q) => (
            <TouchableOpacity key={q.label} style={styles.quickTile} activeOpacity={0.75}>
              <Ionicons name={q.icon} size={24} color={Colors.primary} />
              <Text style={styles.quickLabel}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu sections */}
        {MENU.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, i) => (
                <View key={item.label}>
                  <MenuRow item={item} />
                  {i < section.items.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.version}>MIGO v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F5F5' },

  /* Profile card */
  profileCard: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: 24,
    gap: 12,
  },
  avatarWrap: { alignSelf: 'flex-start', position: 'relative' },
  avatar: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: '#F0F0F0',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: Colors.primaryDark,
    borderWidth: 2, borderColor: Colors.white,
    justifyContent: 'center', alignItems: 'center',
  },
  profileText: { gap: 2 },
  guestName: { fontSize: 20, fontWeight: '800', color: Colors.white },
  guestSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  authRow: { flexDirection: 'row', gap: Spacing.sm },
  loginBtn: {
    flex: 1, backgroundColor: Colors.white,
    borderRadius: Radius.button, paddingVertical: 10,
    alignItems: 'center',
  },
  loginBtnText: { color: Colors.primary, fontSize: 14, fontWeight: '800' },
  registerBtn: {
    flex: 1,
    borderRadius: Radius.button, paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.7)',
  },
  registerBtnText: { color: Colors.white, fontSize: 14, fontWeight: '700' },

  /* Quick actions */
  quickActions: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    marginBottom: 8,
  },
  quickTile: { flex: 1, alignItems: 'center', gap: 5 },
  quickLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },

  /* Menu sections */
  section: { marginBottom: 8 },
  sectionTitle: {
    fontSize: 11, fontWeight: '700',
    color: Colors.textMuted, textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: Spacing.base, paddingVertical: 8,
  },
  sectionCard: { backgroundColor: Colors.white },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: 14, gap: 12,
  },
  menuIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#FFF2E8',
    justifyContent: 'center', alignItems: 'center',
  },
  menuIconDanger: { backgroundColor: '#FFF0F0' },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  menuLabelDanger: { color: Colors.error },
  badgePill: {
    backgroundColor: Colors.primary, borderRadius: Radius.pill,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  badgeText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  chevron: { marginLeft: 'auto' },
  separator: {
    height: 0.5, backgroundColor: Colors.border,
    marginLeft: 16 + 36 + 12,
  },
  version: {
    textAlign: 'center', fontSize: 11,
    color: Colors.textMuted, paddingVertical: 20,
  },
});
