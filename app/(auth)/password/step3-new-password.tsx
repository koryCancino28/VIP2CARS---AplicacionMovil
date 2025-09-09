// Paso 3: Nueva contraseña
// - Inputs: nueva contraseña + repetir.
// - Validación (longitud, coincide).
// - Api.resetPassword({ dni, newPassword })
// - Redirige a (auth)/login con un banner de éxito.

import CustomText from "@/components/CustomText";
import { router, useLocalSearchParams } from "expo-router";
<<<<<<< HEAD
import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const icon = require('../../../assets/images/logo-vip2cars.png');
=======
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
>>>>>>> Henry

export default function Step3NewPassword() {
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onSubmit = async () => {
    // await Api.resetPassword({ dni, newPassword });
    router.replace("/(auth)/login");
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
        paddingVertical: 48,
        paddingHorizontal: 50,
        width: "100%",
        maxWidth: 400,
        alignSelf: "center",
        justifyContent: "center"
      }}>
        {/*Titulo*/}
        <CustomText style={{ color: "#090909ff", fontSize: 28, fontWeight: "700", marginBottom: 10, textAlign: "center", paddingBottom:15}}>RECUPERAR CONTRASEÑA</CustomText>
        {/* Input Nueva Contraseña */}
        <CustomText style={{paddingBottom:5}}>NUEVA CONTRASEÑA</CustomText>
        <TextInput
          style={{ backgroundColor: "#fcfcfcff", borderWidth: 1, borderColor: "#939393ff", color: "#000", borderRadius: 10, padding: 12, marginBottom: 16 }}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        {/* Input Repetir Contraseña */}
        <CustomText style={{paddingBottom:5}}>REPETIR CONTRASEÑA</CustomText>
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
            <CustomText style={{
              color: 'white',
              fontSize: 18
            }}>
              INICIAR SESIÓN
            </CustomText>
          </TouchableOpacity>
        </View>
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
      <Text style={{ color: "#000000ff", fontWeight: "700", fontSize: 18, marginBottom: 14, alignSelf: "center" }}>RECUPERAR CONTRASEÑA</Text>
      <TextInput placeholder="Nueva contraseña" placeholderTextColor="#666"
        secureTextEntry style={{ backgroundColor: "#ecececff", color: "#000000ff", borderRadius: 10, padding: 12, marginBottom: 12 }} />
      <TextInput placeholder="Repetir contraseña" placeholderTextColor="#666"
        secureTextEntry style={{ backgroundColor: "#ecececff", color: "#000000ff", borderRadius: 10, padding: 12, marginBottom: 16 }} />
      {/* Botón personalizado */}
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
>>>>>>> Henry
    </View>
  );
}