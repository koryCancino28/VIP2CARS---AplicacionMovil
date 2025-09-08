// Paso 1: Ingresar DNI
// - Valida DNI.
// - Llama a Api.sendRecoveryCode(dni).
// - Navega a step2-code pasando el dni como parámetro para mostrar el número enmascarado.

import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Step1Dni() {
  const [dni, setDni] = useState('');
  const onContinue = async () => {
    // await Api.sendRecoveryCode(dni);
    router.push({ pathname: "/(auth)/password/step2-code", params: { dni } });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
      <Image
        source={require("../../../assets/images/vip2cars_logo.png")} 
        style={{ width: 350, height: 120, alignSelf: "center", marginBottom: 10, marginTop: -90 }}
        resizeMode="contain"
      />
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 24,
        }}
      >
      <Text style={{ color: "#000000ff", fontSize: 18, fontWeight: "700", marginBottom: 16, alignSelf: "center" }}>RECUPERAR CONTRASEÑA</Text>
      <Text style={{ color: "#222222ff", marginBottom: 8 }}>Ingrese su DNI registrado</Text>
      <TextInput
        style={{ backgroundColor: "#ecececff", color: "#000000ff", borderRadius: 10, padding: 12, marginBottom: 16 }}
        value={dni}
        onChangeText={setDni}
        placeholder="DNI"
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={onContinue}
        style={{
          backgroundColor: "#E1052A", 
          paddingVertical: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Continuar</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
