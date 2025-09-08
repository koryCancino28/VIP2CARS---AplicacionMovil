// components/Layout.tsx
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Footer from "./footer";
import Header from "./header";

export default function Layout({
  children,
  activeTab,
}: {
  children: ReactNode;
  activeTab: string;
}) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
      <Footer activeTab={activeTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, padding: 24 },
});
