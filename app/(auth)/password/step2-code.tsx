// Paso 2: Código de verificación
// - Muestra "Enviamos un código al +51 9***" (con DNI del step1).
// - Input para código.
// - Botón "Continuar" → step3-new-password.
// - Link "Reenviar código" (cooldown de 30–60s).

import CustomText from "@/components/CustomText";
import { router, useLocalSearchParams } from "expo-router";
<<<<<<< HEAD
import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const icon = require('../../../assets/images/logo-vip2cars.png');
=======
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
>>>>>>> Henry

export default function Step2Code() {
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const [code, setCode] = useState('');
  const onContinue = async () => {
    // await Api.verifyRecoveryCode({ dni, code });
    router.push({ pathname: "/(auth)/password/step3-new-password", params: { dni } });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
<<<<<<< HEAD
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
=======
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
      <Text style={{ color: "#0f0f0fff", fontWeight: "700", fontSize: 18, marginBottom: 10, alignSelf: "center" }}>RECUPERAR CONTRASEÑA</Text>
      <Text style={{ color: "#080808ff", marginBottom:10 }}>Ingrese el código enviado al número asociado al DNI {dni}</Text>
      <TextInput style={{ backgroundColor: "#ecececff", color: "#000000ff", borderRadius: 10, padding: 12, marginBottom: 16 }} />
      <Pressable onPress={() => {/* Api.resendCode(dni) */}}>
        <Text style={{ color: "#E1052A", marginBottom: 12 }}>Reenviar código</Text>
      </Pressable>
      {/* Botón personalizado */}
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
>>>>>>> Henry
      </View>
    </View>
  );
}