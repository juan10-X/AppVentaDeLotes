import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

const API_URL = "http://10.55.241.207:90";

const loginRegistrate = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [celular, setCelular] = useState("");

  const Registro = async () => {
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !contraseña.trim() ||
      !celular.trim()
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/Usuario/usuario_Registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: nombre,
          Correo: correo,
          Contraseña: contraseña,
          Celular: celular,
          TipoUsuario: "",
          Estado: "",
        }),
      });
      const data = await response.text();
      if (response.ok) {
        alert("Usuario registrado exitosamente");
        navigation.replace("Login");
      } else {
        alert("Error al registrar usuario" + data);
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con el servidor. Revisa tu conexión.");
    }
  };
  return (
    <LinearGradient
      colors={["#069488", "#a1f3ec", "#069488"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Registrate:</Text>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        <TextInput
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Celular"
          value={celular}
          onChangeText={setCelular}
          style={styles.input}
        />
        <TouchableOpacity onPress={Registro} style={styles.btregistro}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Registrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.regresar}
          onPress={() => navigation.replace("Login")}
        >
          <Text>Regresar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    elevation: 50,
    width: "90%",
    height: "85%",
    borderRadius: 10,
    padding: 20,
    boxShadow:
      "-4px 4px 4px -4px rgba(0, 0, 0, 0.1), -4px 4px 4px 4px rgba(0, 0, 0, 0.06)",
    backgroundColor: "#a1f3ec",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    // borderWidth:1.5,

    height: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  btregistro: {
    marginTop: 10,
    justifyContent: "center",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    backgroundColor: "#09caba",
  },
  regresar: {
    backgroundColor: "#09caba",
    padding: 10,
    justifyContent: "center",
    height: 40,
    width: 80,
    borderRadius: 10,
    marginTop: "auto",
  },
});

export default loginRegistrate;
