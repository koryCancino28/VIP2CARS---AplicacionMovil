// Paso 1: Ingresar DNI
// - Valida DNI.
// - Llama a Api.sendRecoveryCode(dni).
// - Navega a step2-code pasando el dni como parámetro para mostrar el número enmascarado.

import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import { API_BASE_URL } from '../../../constants/API';
import { CustomText } from '../../_layout';

const icon = require('../../../assets/images/logo-vip2cars.png');
export default function Step1Dni() {
  const [dni, setDni] = useState('');
  const onContinue = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-recovery-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni }),
      });
      const data = await response.json();
      if (response.ok) {
        // Mostrar código en alert para testing
        Alert.alert(
          'Código SMS',
          `Tu código de recuperación es: ${data.code}\n\n(En producción esto se enviaría por SMS)`,
          [
            { text: 'OK', onPress: () => router.push({ pathname: "/(auth)/password/step2-code", params: { dni } }) }
          ]
        );
      } else {
        Alert.alert('Error', data.detail || 'Error al enviar el código');
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
        paddingVertical: 48,
        paddingHorizontal: 50,
        width: "100%",
        maxWidth: 400,
        alignSelf: "center",
        justifyContent: "center"
      }}>
        {/*Titulo*/}
        <CustomText style={{ color: "#090909ff", fontSize: 28, fontWeight: "700", marginBottom: 10, textAlign: "center" }}>RECUPERAR CONTRASEÑA</CustomText>
        {/*Subtitulo*/}
        <CustomText style={{ color: "#636363ff", marginBottom: 15, textAlign: "center" }}>INGRESE SU DNI REGISTRADO</CustomText>
        {/* Input DNI + Botón Continuar */}
        <CustomText style={{marginBottom:5}}>DNI</CustomText>
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
