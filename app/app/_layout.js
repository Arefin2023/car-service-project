import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
export default function AppLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Slot />
    </ClerkProvider>
  );
}
