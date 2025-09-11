// app/(auth)/login.tsx
// === Login ===
// - Inputs: DNI, Contraseña
// - Checkbox "Recordarme" (guardar token/flag en AsyncStorage)
// - Botón "Ingresar": llama Api.login(), guarda token en AuthContext, redirige a (tabs)
// - Link a recuperación: (auth)/password/step1-dni

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Switch, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from '../../components/CustomText';
import { API_BASE_URL } from '../../constants/API';

const icon = require('../../assets/images/logo-vip2cars.png');

export default function LoginScreen() {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  

  const onSubmit = async () => {
    // 1. Validar campos
    if (!dni || !password) {
        Alert.alert("Error", "Por favor ingrese DNI y contraseña.");
        return;
    }

    try {
        // 2. Hacer petición a la API real
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dni, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // 3. Guardar token en AsyncStorage si "Recordarme"
            if (remember) {
                await AsyncStorage.setItem('user_token', data.access_token);
                await AsyncStorage.setItem('user_data', JSON.stringify({
                    user_id: data.user_id,
                    user_doc: data.user_doc
                }));
            }

            // 4. Redirigir directamente a la sección de servicios/diagnósticos
            Alert.alert("Éxito", "Login exitoso!", [
                { text: "OK", onPress: () => router.replace("/(tabs)/services") }
            ]);
        } else {
            // 5. Manejar errores de la API
            Alert.alert("Error", data.detail || "Credenciales inválidas");
        }
    } catch (error) {
        Alert.alert("Error", "Error de conexión con el servidor");
    }
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
        <CustomText style={{ color: "#000000ff", marginBottom:5 }}>CONTRSEÑA</CustomText>
        <TextInput
          secureTextEntry
          style={{ backgroundColor: "#ffffffff", borderWidth:1,borderColor:"#939393ff" ,color: "#000", borderRadius: 8, height:50 ,padding: 12, marginBottom: 5 }}
          value={password}
          onChangeText={setPassword}
        />
        
        {/* Link a recuperación */}
        <View/>
        <Link href="/(auth)/password/step1-dni" asChild>
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
