// app/(auth)/login.tsx
// === Login ===
// - Inputs: DNI, Contraseña
// - Checkbox "Recordarme" (guardar token/flag en AsyncStorage)
// - Botón "Ingresar": llama Api.login(), guarda token en AuthContext, redirige a (tabs)
// - Link a recuperación: (auth)/password/step1-dni

import CustomText from "@/components/CustomText";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, Switch, TextInput, TouchableOpacity, View } from "react-native";

const icon = require('../../assets/images/logo-vip2cars.png');

export default function LoginScreen() {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    // TODO:
    // 1) Validar campos
    // 2) Api.login(dni, password)
    // 3) Guardar token/usuario en AuthContext y AsyncStorage si "Recordarme"
    // 4) router.replace("(tabs)");
    router.replace("../(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 24, justifyContent: "center" }}>
      {/*Logo*/}
      <Image source={icon} style={{ width: 380, height: 60, alignSelf: "center", marginBottom: 20 }}></Image>
      {/*Formulario*/}
      <View style={{ backgroundColor: "#ffffffff", borderRadius: 45, paddingVertical: 32, paddingHorizontal: 42, width: "100%", maxWidth: 400, minHeight: 400, alignSelf: "center", justifyContent: "center" }}>
        <CustomText style={{ color: "#010101ff", fontSize: 28, fontWeight: "800", marginBottom: 12, textAlign: "center" }}>INICIO DE SESIÓN</CustomText>

        {/* DNI */}
        <CustomText style={{ color: "#080808ff", marginBottom:5 }}>DNI</CustomText>
        <TextInput
          style={{ backgroundColor: "#ffffffff", borderWidth: 1, borderColor:"#939393ff" ,color: "#000", borderRadius: 8, padding: 12, height:50 ,marginBottom: 18 }}
          value={dni}
          onChangeText={setDni}
          keyboardType="numeric"
          maxLength={8}
        />

        {/* Contraseña */}
        <CustomText style={{ color: "#000000ff", marginBottom:5 }}>CONTRASEÑA</CustomText>
        <TextInput
          secureTextEntry
          style={{ backgroundColor: "#ffffffff", borderWidth:1,borderColor:"#939393ff" ,color: "#000", borderRadius: 8, height:50 ,padding: 12, marginBottom: 5 }}
          value={password}
          onChangeText={setPassword}
        />
        
        {/* Link a recuperación */}
        <View/>
        <Link href="../(auth)/password/step1-dni" asChild>
          <CustomText style={{ color: "#E1052A" }}>¿OLVIDASTE TU CONTRASEÑA?</CustomText>
        </Link>

        {/* Recordarme + Botón Ingresar */}   
        <View style={{ marginTop: 24, alignItems: "center" }}>
        {/* Recordarme */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
            <Switch
              trackColor={{ false: "#767577", true: "#E4022E" }}
              thumbColor={"#ffffff"}
              value={remember}
              onValueChange={setRemember}
            />
            <CustomText style={{ color: "#000000ff", fontSize:13}}>RECORDARME EN ESTE DISPOSITIVO</CustomText>
          </View>

          {/* Botón Ingresar */}
          <View style={{ width: "100%", maxWidth: 200 }}>
            <TouchableOpacity style={{ backgroundColor: "#E4022E", borderRadius: 22, paddingVertical: 15, paddingHorizontal: 24, alignItems: 'center' }} onPress={onSubmit}>
              <CustomText style={{ color: 'white', fontSize: 18 }}>INICIAR SESIÓN</CustomText>
            </TouchableOpacity>
          </View>

        </View>
      </View>

    </View>
  );
}
