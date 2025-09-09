// Paso 3: Nueva contraseña
// - Inputs: nueva contraseña + repetir.
// - Validación (longitud, coincide).
// - Api.resetPassword({ dni, newPassword })
// - Redirige a (auth)/login con un banner de éxito.

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const icon = require('../../../assets/images/logo-vip2cars.png');

export default function Step3NewPassword() {
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async () => {
    // Validación de las contraseñas
    if (newPassword.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // await Api.resetPassword({ dni, newPassword });
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
      {/* Logo */}
      <Image
        source={icon}
        style={{ width: 350, height: 120, alignSelf: "center", marginBottom: 10, marginTop: -90 }}
        resizeMode="contain"
      />
      
      {/* Formulario */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 24,
        }}
      >
        {/* Titulo */}
        <Text style={{ color: "#000000ff", fontWeight: "700", fontSize: 18, marginBottom: 14, alignSelf: "center" }}>
          RECUPERAR CONTRASEÑA
        </Text>
        
        {/* Input Nueva Contraseña */}
        <TextInput
          placeholder="Nueva contraseña"
          placeholderTextColor="#666"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          style={{ backgroundColor: "#ecececff", color: "#000000ff", borderRadius: 10, padding: 12, marginBottom: 12 }}
        />

        {/* Input Repetir Contraseña */}
        <TextInput
          placeholder="Repetir contraseña"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ backgroundColor: "#ecececff", color: "#000000ff", borderRadius: 10, padding: 12, marginBottom: 16 }}
        />

        {/* Botón Guardar e Iniciar sesión */}
        <TouchableOpacity
          onPress={onSubmit}
          style={{
            backgroundColor: "#E1052A", 
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Guardar e iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
