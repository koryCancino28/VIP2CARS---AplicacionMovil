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
      {/*Logo*/}
      <Image source={icon} style={{ width: 380, height: 60, alignSelf: "center", marginBottom: 20 }}></Image>
      {/*Formulario*/}
      <View style={{
        backgroundColor: "#ffffffff",
        borderRadius: 45,
        paddingVertical: 48,
        paddingHorizontal: 50,
        width: "100%",
        maxWidth: 400,
        alignSelf: "center",
        justifyContent: "center"
      }}>
        {/*Titulo*/}
        <Text style={{ color: "#090909ff", fontSize: 28, fontWeight: "700", marginBottom: 10, textAlign: "center", paddingBottom:15}}>RECUPERAR CONTRASEÑA</Text>
        {/* Input Nueva Contraseña */}
        <Text style={{paddingBottom:5}}>NUEVA CONTRASEÑA</Text>
        <TextInput
          style={{ backgroundColor: "#fcfcfcff", borderWidth: 1, borderColor: "#939393ff", color: "#000", borderRadius: 10, padding: 12, marginBottom: 16 }}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        {/* Input Repetir Contraseña */}
        <Text style={{paddingBottom:5}}>REPETIR CONTRASEÑA</Text>
        <TextInput
          style={{ backgroundColor: "#fcfcfcff", borderWidth: 1, borderColor: "#939393ff", color: "#000", borderRadius: 10, padding: 12, marginBottom: 16 }}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={{ width: "100%", maxWidth: 180, alignSelf: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#E4022E",
              borderRadius: 22,
              paddingVertical: 15,
              paddingHorizontal: 15,
              alignItems: 'center'
            }}
            onPress={onSubmit}
          >
            <Text style={{
              color: 'white',
              fontSize: 18
            }}>
              INICIAR SESIÓN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
