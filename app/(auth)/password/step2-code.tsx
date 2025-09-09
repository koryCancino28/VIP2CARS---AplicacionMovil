// Paso 2: Código de verificación
// - Muestra "Enviamos un código al +51 9***" (con DNI del step1).
// - Input para código.
// - Botón "Continuar" → step3-new-password.
// - Link "Reenviar código" (cooldown de 30–60s).

import { router, useLocalSearchParams } from "expo-router";


import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const icon = require('../../../assets/images/logo-vip2cars.png');

export default function Step2Code() {
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const [code, setCode] = useState('');
  
  const onContinue = async () => {
    // await Api.verifyRecoveryCode({ dni, code });
    router.push({ pathname: "/(auth)/password/step3-new-password", params: { dni } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
      {/*Logo*/}
      <Image source={icon} style={{ width: 380, height: 60, alignSelf: "center", marginBottom: 20 }}></Image>
      {/*Formulario*/}
      <View style={{
        backgroundColor: "#ffffffff",
        borderRadius: 45,
        paddingVertical: 42,
        paddingHorizontal: 55,
        width: "100%",
        maxWidth: 400,
        alignSelf: "center",
        justifyContent: "center"
      }}>
        {/*Titulo*/}
        <Text style={{ color: "#090909ff", fontSize: 28, fontWeight: "700", marginBottom: 10, textAlign: "center" }}>RECUPERAR CONTRASEÑA</Text>
        {/*Subtitulo*/}
        <Text style={{ color: "#636363ff", marginBottom: 15, textAlign: "center", paddingHorizontal:10 }}>INGRESE EL CÓDIGO DE VERIFICACIÓN ENVIADO AL NÚMERO: +51 9********</Text>
        {/* Input Código */}
        <Text style={{ marginBottom:5}}>CÓDIGO</Text>
        <TextInput
          style={{ backgroundColor: "#fcfcfcff", borderWidth: 1, borderColor: "#939393ff", color: "#000", borderRadius: 10, padding: 12, marginBottom: 5 }}
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
        />
        {/* Reenviar código */}
        <TouchableOpacity onPress={() => {/* Api.resendCode(dni) */}} style={{ marginBottom: 28 }}>
          <Text style={{ color: "#E1052A", textAlign:"left" }}>REENVIAR CÓDIGO</Text>
        </TouchableOpacity>
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
