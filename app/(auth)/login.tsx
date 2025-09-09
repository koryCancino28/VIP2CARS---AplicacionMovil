// app/(auth)/login.tsx
// === Login ===
// - Inputs: DNI, Contraseña
// - Checkbox "Recordarme" (guardar token/flag en AsyncStorage)
// - Botón "Ingresar": llama Api.login(), guarda token en AuthContext, redirige a (tabs)
// - Link a recuperación: (auth)/password/step1-dni

import { Link, router } from "expo-router";
import { Image, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  // TODO: estado local para dni, password, remember, loading, error

  const handleLogin = () => {
    // Aquí validas usuario/contraseña...
    // y si es correcto, lo mandas a details 👇
    router.push("/(tabs)/services/index");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 24, justifyContent: "center" }}>
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
    </View>
  );
}
