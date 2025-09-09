// app/(auth)/password/step1-dni.tsx
// === Paso 1: Ingresar DNI ===
// - Valida DNI.
// - Llama a Api.sendRecoveryCode(dni).
// - Navega a step2-code pasando el dni como parámetro para mostrar el número enmascarado.

import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";


const icon = require('../../../assets/images/logo-vip2cars.png');

export default function Step1Dni() {
  const [dni, setDni] = useState('');
  
  const onContinue = async () => {
    // await Api.sendRecoveryCode(dni); // Aquí puedes agregar la llamada a la API.
    router.push({ pathname: "/(auth)/password/step2-code", params: { dni } });
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
        <Text style={{ color: "#090909ff", fontSize: 28, fontWeight: "700", marginBottom: 10, textAlign: "center" }}>RECUPERAR CONTRASEÑA</Text>
        {/*Subtitulo*/}
        <Text style={{ color: "#636363ff", marginBottom: 15, textAlign: "center" }}>INGRESE SU DNI REGISTRADO</Text>
        {/* Input DNI + Botón Continuar */}
        <Text style={{marginBottom:5}}>DNI</Text>
        <TextInput
          style={{ backgroundColor: "#fcfcfcff", borderWidth: 1, borderColor: "#939393ff", color: "#000000ff", borderRadius: 10, padding: 12, marginBottom: 16 }}
          value={dni}
          onChangeText={setDni}
          keyboardType="numeric"
        />
        <View style={{ width: "100%", maxWidth: 180, alignSelf: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#E4022E",
              borderRadius: 22,
              paddingVertical: 12,
              paddingHorizontal: 24,
              alignItems: 'center'
            }}
           onPress={onContinue}
          >
            <Text style={{
              color: 'white',
              fontSize: 18
            }}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
