import React from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import Layout from "../../components/utils/layout";

export default function VehicleDetailsScreen() {

  return (
    <Layout activeTab="cart">

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>Detalles del Vehículo</Text>
      </View>

    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
});
