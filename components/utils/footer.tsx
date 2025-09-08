// components/Footer.tsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Footer({ activeTab }: { activeTab: string }) {
  const goTo = (screen: string) => {
    if (screen === "home") alert("Ir a Inicio - No implementado");
    if (screen === "cart") router.replace("/vehiculo/details");
    if (screen === "history") alert("Ir a Historial - No implementado");
  };

  return (
    <View style={styles.footer}>
      {/* Inicio */}
      <TouchableOpacity style={styles.tab} onPress={() => goTo("home")}>
        <Ionicons
          name="home"
          size={28}
          color={activeTab === "home" ? "#E1052A" : "#fff"}
        />
        <Text style={[styles.tabText, activeTab === "home" && styles.tabTextActive]}>
          Inicio
        </Text>
      </TouchableOpacity>

      {/* Vehículos */}
      <TouchableOpacity style={styles.tab} onPress={() => goTo("cart")}>
        <Ionicons
          name="car-sport"
          size={28}
          color={activeTab === "cart" ? "#E1052A" : "#fff"}
        />
        <Text style={[styles.tabText, activeTab === "cart" && styles.tabTextActive]}>
          Vehículos
        </Text>
      </TouchableOpacity>

      {/* Historial */}
      <TouchableOpacity style={styles.tab} onPress={() => goTo("history")}>
        <Ionicons
          name="time"
          size={28}
          color={activeTab === "history" ? "#E1052A" : "#fff"}
        />
        <Text style={[styles.tabText, activeTab === "history" && styles.tabTextActive]}>
          Historial
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#000",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  tab: { flex: 1, alignItems: "center" },
  tabText: { color: "#fff", fontSize: 12, marginTop: 4 },
  tabTextActive: { color: "#E1052A", fontWeight: "bold" },
});

