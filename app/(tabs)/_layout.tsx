// app/(tabs)/_layout.tsx
import { Slot, usePathname } from "expo-router";
import Layout from "../../components/utils/layout";

export default function TabsLayout() {
  const pathname = usePathname();

  // Determinar pestaña activa según la ruta
  let activeTab = "";
  if (pathname.includes("/services")) activeTab = "cart";
  if (pathname.includes("/history")) activeTab = "history";
  if (pathname.includes("/home")) activeTab = "home";
} 
