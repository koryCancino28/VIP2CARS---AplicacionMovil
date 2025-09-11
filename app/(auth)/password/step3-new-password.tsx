// Paso 3: Nueva contraseña
// - Inputs: nueva contraseña + repetir.
// - Validación (longitud, coincide).
// - Api.resetPassword({ dni, newPassword })
// - Redirige a (auth)/login con un banner de éxito.

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import { API_BASE_URL } from '../../../constants/API';
import { CustomText } from '../../_layout';

const icon = require('../../../assets/images/logo-vip2cars.png');

export default function Step3NewPassword() {
  const { dni, code } = useLocalSearchParams<{ dni: string; code: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  // Validar contraseñas en tiempo real
  const validatePasswords = (pwd: string, confirmPwd: string) => {
    setPasswordsMatch(pwd === confirmPwd && pwd.length >= 6 && confirmPwd.length >= 6);
    setShowValidation(pwd.length > 0 || confirmPwd.length > 0);
  };

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
    validatePasswords(text, confirmPassword);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    validatePasswords(newPassword, text);
  };
  const onSubmit = async () => {
    // Validaciones de contraseña
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Por favor complete ambos campos de contraseña');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni, code, new_password: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', 'Contraseña actualizada correctamente', [
          { text: 'OK', onPress: () => router.replace("/(auth)/login") }
        ]);
      } else {
        Alert.alert('Error', data.detail || 'Error al actualizar la contraseña');
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
        <CustomText style={{ color: "#090909ff", fontSize: 28, fontWeight: "700", marginBottom: 10, textAlign: "center", paddingBottom:15}}>RECUPERAR CONTRASEÑA</CustomText>
        {/* Input Nueva Contraseña */}
        <CustomText style={{paddingBottom:5}}>NUEVA CONTRASEÑA</CustomText>
        <TextInput
          style={{
            backgroundColor: "#fcfcfcff",
            borderWidth: 1,
            borderColor: newPassword.length > 0 && newPassword.length < 6 ? "#ff0000" : "#939393ff",
            color: "#000",
            borderRadius: 10,
            padding: 12,
            marginBottom: 16
          }}
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          secureTextEntry
          placeholder="Mínimo 6 caracteres"
        />
        {/* Input Repetir Contraseña */}
        <CustomText style={{paddingBottom:5}}>REPETIR CONTRASEÑA</CustomText>
        <TextInput
          style={{
            backgroundColor: "#fcfcfcff",
            borderWidth: 1,
            borderColor: showValidation
              ? (passwordsMatch ? "#00ff00" : "#ff0000")
              : "#939393ff",
            color: "#000",
            borderRadius: 10,
            padding: 12,
            marginBottom: showValidation ? 5 : 16
          }}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry
          placeholder="Repite la contraseña"
        />
        {showValidation && (
          <CustomText style={{
            color: passwordsMatch ? "#00aa00" : "#ff0000",
            fontSize: 12,
            marginBottom: 16,
            textAlign: 'center'
          }}>
            {passwordsMatch ? "✓ Contraseñas coinciden" : "✗ Las contraseñas no coinciden"}
          </CustomText>
        )}
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
    </View>
  );
}