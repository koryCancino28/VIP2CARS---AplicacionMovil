// Paso 3: Nueva contraseña
// - Inputs: nueva contraseña + repetir.
// - Validación (longitud, coincide).
// - Api.resetPassword({ dni, newPassword })
// - Redirige a (auth)/login con un banner de éxito.
import { router, useLocalSearchParams } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Step3NewPassword() {
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const onSubmit = async () => {
    // await Api.resetPassword({ dni, password });
    router.replace("/(auth)/login");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
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
    </View>
  );
}