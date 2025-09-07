// Paso 1: Ingresar DNI
// - Valida DNI.
// - Llama a Api.sendRecoveryCode(dni).
// - Navega a step2-code pasando el dni como parámetro para mostrar el número enmascarado.

import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Step1Dni() {
  const [dni, setDni] = useState('');
  const onContinue = async () => {
    // await Api.sendRecoveryCode(dni);
    router.push({ pathname: "/(auth)/password/step2-code", params: { dni } });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 16 }}>RECUPERAR CONTRASEÑA</Text>
      <Text style={{ color: "#aaa", marginBottom: 8 }}>Ingrese su DNI registrado</Text>
      <TextInput
        style={{ backgroundColor: "#111", color: "#fff", borderRadius: 10, padding: 12, marginBottom: 16 }}
        value={dni}
        onChangeText={setDni}
        placeholder="DNI"
        keyboardType="numeric"
      />
      <Button title="Continuar" onPress={onContinue} />
    </View>
  );
}
