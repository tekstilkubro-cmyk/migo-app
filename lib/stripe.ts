// Stripe client — initialize after installing stripe-react-native
// npx expo install @stripe/stripe-react-native
// Then wrap your root layout with <StripeProvider publishableKey={...}>

export const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';
