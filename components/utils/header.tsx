
// components/Header.tsx
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);

  const logout = () => {
    setMenuVisible(false);
    router.replace("/login");
  };

  return (
    <View style={styles.header}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/vip2cars_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Botón hamburguesa */}
      <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        style={styles.menuButton}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.modalMenu}>
            <View style={styles.avatarCircle} />
            <Text style={styles.username}>@USER</Text>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.logoutText}>SIGN OUT</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoContainer: { position: "absolute", left: 0, right: 0, alignItems: "center" },
  logo: { width: 280, height: 70 },
  menuButton: { position: "absolute", right: 16, top: "50%", transform: [{ translateY: -12 }], padding: 8 },
  menuIcon: { fontSize: 24, color: "#fff" },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  modalMenu: {
    position: "absolute",
    top: 40,
    right: 16,
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: 160,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#E1052A",
    marginBottom: 10,
  },
  username: { color: "#fff", marginBottom: 20 },
  logoutText: { color: "#E1052A", fontWeight: "bold" },
});
