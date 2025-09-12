import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

export default function HistoryScreen() {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handlePress = (vehicle: string) => {
    setSelectedVehicle(vehicle);
    setShowAlert(true);
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

      {/* @ts-ignore */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Historial"
        message={`Abrir historial de: ${selectedVehicle}`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#cc0000"
        onConfirmPressed={() => setShowAlert(false)}
        contentContainerStyle={{ backgroundColor: "#1a1a1a", borderRadius: 12 }}
        titleStyle={{ color: "#fff", fontSize: 20 }}
        messageStyle={{ color: "#ccc", fontSize: 16 }}
        confirmButtonStyle={{ paddingHorizontal: 25 }}
        confirmButtonTextStyle={{ color: "#fff", fontWeight: "bold" }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#cc0000",
    shadowColor: "#cc0000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cardTitle: {
    color: "#ffffff",
    fontWeight: "700",
    marginBottom: 6,
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  labelLight: {
    color: "#bbbbbb",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
});
