import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HistoryScreen() {
  const handlePress = (vehicle: string) => {
    // Aquí decides qué hacer cuando se toca una tarjeta
    alert(`Abrir historial de: ${vehicle}`);
    // Ejemplo: router.push(`/details/${vehicle}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>HISTORIAL</Text>

      <TouchableOpacity style={styles.card} onPress={() => handlePress("SUV HTM-2024")}>
        <Text style={styles.cardTitle}>SUV HTM-2024</Text>
        <Text style={styles.labelLight}>ESTADO COMPLETO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handlePress("TOYOTA COROLLA 2023")}>
        <Text style={styles.cardTitle}>TOYOTA COROLLA 2023</Text>
        <Text style={styles.labelLight}>ESTADO COMPLETO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handlePress("NISSAN SENTRA 2022")}>
        <Text style={styles.cardTitle}>NISSAN SENTRA 2022</Text>
        <Text style={styles.labelLight}>ESTADO COMPLETO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handlePress("MAZDA CX-5 2021")}>
        <Text style={styles.cardTitle}>MAZDA CX-5 2021</Text>
        <Text style={styles.labelLight}>ESTADO COMPLETO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2b2b2bff" },
  scrollContent: { padding: 8 },
  title: { color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center", marginBottom: 20 },

  card: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // sombra en Android
    shadowColor: "#000", // sombra en iOS
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: { color: "#fff", fontWeight: "bold", marginBottom: 6, fontSize: 16 },
  labelLight: { color: "#aaa", fontSize: 12 },
});
