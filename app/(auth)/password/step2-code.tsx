// Paso 2: Código de verificación
// - Muestra "Enviamos un código al +51 9***" (con DNI del step1).
// - Input para código.
// - Botón "Continuar" → step3-new-password.
// - Link "Reenviar código" (cooldown de 30–60s).

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import { API_BASE_URL } from '../../../constants/API';
import { CustomText } from '../../_layout';

const icon = require('../../../assets/images/logo-vip2cars.png');

export default function Step2Code() {
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const [code, setCode] = useState('');
  const onContinue = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-recovery-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni, code }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push({ pathname: "/(auth)/password/step3-new-password", params: { dni, code } });
      } else {
        Alert.alert('Error', data.detail || 'Código incorrecto');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión');
    }
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
        <CustomText style={{ color: "#090909ff", fontSize: 28, fontWeight: "700", marginBottom: 10, textAlign: "center" }}>RECUPERAR CONTRASEÑA</CustomText>
        {/*Subtitulo*/}
        <CustomText style={{ color: "#636363ff", marginBottom: 15, textAlign: "center", paddingHorizontal:10 }}>INGRESE EL CÓDIGO DE VERIFICACIÓN ENVIADO AL NÚMERO: +51 9********</CustomText>
        {/* Input Código */}
        <CustomText style={{ marginBottom:5}}>CÓDIGO</CustomText>
        <TextInput
          style={{ backgroundColor: "#fcfcfcff", borderWidth: 1, borderColor: "#939393ff", color: "#000", borderRadius: 10, padding: 12, marginBottom: 5 }}
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
        />
        {/* Reenviar código */}
        <TouchableOpacity onPress={() => {/* Api.resendCode(dni) */}} style={{ marginBottom: 28 }}>
          <CustomText style={{ color: "#E1052A", textAlign:"left" }}>REENVIAR CÓDIGO</CustomText>
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
            <CustomText style={{
              color: 'white',
              fontSize: 18
            }}>
              CONTINUAR
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}