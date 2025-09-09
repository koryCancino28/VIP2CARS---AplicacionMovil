import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VehicleDetailsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Dropdown Header */}
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>SUV HTM-2024</Text>
        <Ionicons name="chevron-down" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>PROGRESO DE SERVICIO</Text>
      <Text style={styles.subtitle}>MANTENIMIENTO CORRECTIVO</Text>

      {/* Estado selector */}
      <View style={styles.stateSelector}>

        <View style={styles.stateSteps}>
          <View style={styles.line} />
          <View style={[styles.circle, styles.active]} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>

        <View style={styles.labels}>
          <Text style={styles.label}>POR COMENZAR</Text>
          <Text style={styles.label}>EN PROCESO</Text>
          <Text style={styles.label}>COMPLETADO</Text>
        </View>
      </View>

      {/* Card Datos Vehículo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>SUV HTM-2024</Text>
        <View style={styles.row}>
          <Text style={styles.labelLight}>PLACA</Text>
          <Text style={styles.labelDark}>HTM-2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>VIN</Text>
          <Text style={styles.labelDark}>JTDBR32E030123456</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>MARCA</Text>
          <Text style={styles.labelDark}>TOYOTA</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>MODELO</Text>
          <Text style={styles.labelDark}>COROLLA</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>AÑO</Text>
          <Text style={styles.labelDark}>2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelLight}>COLOR</Text>
          <Text style={styles.labelDark}>ROJO</Text>
        </View>
      </View>

      {/* Card Estado General */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ESTADO GENERAL</Text>
        {renderProgress("MOTOR", "BUENO", "green", 0.9)}
        {renderProgress("FRENOS", "PRECAUCIÓN", "orange", 0.5)}
        {renderProgress("LLANTAS", "BUENO", "green", 0.8)}
        {renderProgress("BATERÍA", "PELIGRO", "red", 0.3)}
        {renderProgress("TRANSMISIÓN", "BUENO", "green", 0.85)}
        {renderProgress("SUSPENSIÓN", "BUENO", "green", 0.9)}
      </View>
    </ScrollView>
  );
}

function renderProgress(label: string, estado: string, color: string, percent: number) {
  return (
    <View style={{ marginVertical: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "#fff" }}>{label}</Text>
        <Text style={{ color }}>{estado}</Text>
      </View>
      <View style={{ height: 8, backgroundColor: "#444", borderRadius: 6, marginTop: 4 }}>
        <View style={{ width: `${percent * 100}%`, height: 8, backgroundColor: color, borderRadius: 6 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2b2b2bff" }, 
  scrollContent: { padding: 8 }, 
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 6,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  line: {
    position: "absolute",
    top: "50%",
    left: 35,
    right: 35,
    height: 2,
    backgroundColor: "#555", // color de la línea
    zIndex: 0, // se queda detrás de los círculos
  },
  dropdownText: { color: "#fff", fontSize: 16 },
  title: { color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center" },
  subtitle: { color: "#aaa", textAlign: "center", marginBottom: 20 },
  stateSelector: { marginBottom: 20 },
  dropdownState: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1052A",
    padding: 8,
    borderRadius: 6,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dropdownStateText: { color: "#E1052A", fontWeight: "bold" },
  stateSteps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // 👈 esto los separa más
    marginVertical: 20,
    position: "relative",
    paddingHorizontal: 20, // opcional para que no choquen con bordes
  },
  circle: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#555", marginHorizontal: 10, zIndex: 1, },
  active: { backgroundColor: "#E1052A" },
  labels: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: "#aaa", fontSize: 12 },
  card: { backgroundColor: "#222", borderRadius: 12, padding: 16, marginBottom: 20 },
  cardTitle: { color: "#fff", fontWeight: "bold", marginBottom: 10, fontSize: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  labelLight: { color: "#aaa", fontSize: 12 },
  labelDark: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
