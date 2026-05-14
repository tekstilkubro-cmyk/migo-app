import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

function icon(focused: boolean, on: Icon, off: Icon) {
  return ({ color }: { color: string }) => (
    <Ionicons name={focused ? on : off} size={23} color={color} />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarStyle: styles.bar,
        tabBarLabelStyle: styles.label,
        tabBarIconStyle: styles.tabIcon,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            <Ionicons name={focused ? 'home' : 'home-outline'} size={23} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) =>
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) =>
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) =>
            <Ionicons name={focused ? 'clipboard' : 'clipboard-outline'} size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) =>
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E8E8E8',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    height: 60,
    paddingBottom: 8,
    paddingTop: 5,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 0,
  },
  tabIcon: {
    marginBottom: -2,
  },
});
