// app/(auth)/login.tsx
// === Login ===
// - Inputs: DNI, Contraseña
// - Checkbox "Recordarme" (guardar token/flag en AsyncStorage)
// - Botón "Ingresar": llama Api.login(), guarda token en AuthContext, redirige a (tabs)
// - Link a recuperación: (auth)/password/step1-dni

import CustomText from "@/components/CustomText";
import { Link, router } from "expo-router";
<<<<<<< HEAD
import React, { useState } from "react";
import { Image, Switch, TextInput, TouchableOpacity, View } from "react-native";

const icon = require('../../assets/images/logo-vip2cars.png');
=======
import { Image, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
>>>>>>> Henry

export default function LoginScreen() {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Aquí validas usuario/contraseña...
    // y si es correcto, lo mandas a details 
    router.replace("/(tabs)");
    //alert("Login exitoso");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 24, justifyContent: "center" }}>
<<<<<<< HEAD
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

=======
      <Image
        source={require("../../assets/images/vip2cars_logo.png")} 
        style={{ width: 350, height: 120, alignSelf: "center", marginBottom: 10, marginTop: -80 }}
        resizeMode="contain"
      />
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 24,
        }}
      >
      <Text style={{ color: "#000000ff", fontSize: 20, fontWeight: "600", alignSelf:"center", marginBottom: 15 }}>INICIO DE SESIÓN</Text>

      {/* DNI */}
      <Text style={{ color: "#080808ff", marginBottom: 5 }}>DNI</Text>
      <TextInput style={{ backgroundColor: "#ecececff", color: "#000000ff", borderRadius: 8, padding: 12, marginBottom: 12}} />

      {/* Contraseña */}
      <Text style={{ color: "#030303ff", marginBottom: 5 }}>CONTRASEÑA</Text>
      <TextInput secureTextEntry style={{ backgroundColor: "#ecececff", color: "#000000ff", borderRadius: 8, padding: 12, marginBottom: 12}} />

      {/* Recordarme */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Switch />
        <Text style={{ color: "#000000ff", marginLeft: 8 }}>Recordarme en este dispositivo</Text>
      </View>

      {/* Botón personalizado */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#E1052A", 
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Ingresar</Text>
        </TouchableOpacity>
      <View style={{ height: 12 }} />
      <Link href="../(auth)/password/step1-dni" asChild>
        <Text style={{ color: "#E1052A", alignSelf: "center" }}>¿Olvidaste tu contraseña?</Text>
      </Link>
      </View>
>>>>>>> Henry
    </View>
  );
}
