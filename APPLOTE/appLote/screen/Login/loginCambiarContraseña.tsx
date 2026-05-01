import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";

const loginCambiarContraseña = ({ navigation }) => {
  const route = useRoute();

  const formatearNumero = (num) => {
    return `+${num.slice(0, 2)} ${num.slice(2, 5)} ${num.slice(5, 8)} ${num.slice(8)}`;
  };

  const ASESORES = [
    { id: 1, nombre: "Encargado 1:", numero: "51920538362" },
    { id: 2, nombre: "Encargado 2:", numero: "51941534283" },
    // { id: 3, nombre: 'Soporte Técnico:', numero: '51000000000' },
    // { id: 4, nombre: 'Administración:', numero: '51000000000' },
    // { id: 5, nombre: 'Atención al Cliente:', numero: '51000000000' },
  ];

  const WhatsappEnviar = (numeroSeleccionado) => {
    // Reemplaza con el número de teléfono al que deseas enviar el mensaje
    const mensaje =
      "Hola, Necesito ayuda para recuperar mi contraseña, Mi nombre es:"; // El mensaje que deseas enviar

    const url = `whatsapp://send?phone=${numeroSeleccionado}&text=${encodeURIComponent(mensaje)}`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
      }
      Linking.openURL(
        `https://wa.me/${numeroSeleccionado}?text=${encodeURIComponent(mensaje)}`,
      );
    });
  };
  return (
    <LinearGradient
      colors={["#069488", "#a1f3ec", "#069488"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          Haz clik en cualquiera de nuestros numeros disponibles:
        </Text>
        <Text
          style={{ marginBottom: 10, fontWeight: "bold", color: "#069488" }}
        >
          Horario de atencion 8:00am - 5:00pm.
        </Text>
        {ASESORES.map((asesor) => (
          <TouchableOpacity
            key={asesor.id}
            onPress={() => WhatsappEnviar(asesor.numero)}
            style={styles.btnAsesor}
          >
            <Text style={styles.txtAsesor}>{asesor.nombre}</Text>
            <Text style={styles.txtnum}>{formatearNumero(asesor.numero)}</Text>
          </TouchableOpacity>
        ))}

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
    marginBottom: 10,
  },
  btnAsesor: {
    backgroundColor: "#FFF",
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 10,
    height: 60,
    width: "100%",
    justifyContent: "center",
  },
  txtAsesor: {
    paddingBottom: 5,
    color: "#069488",
    fontWeight: "600",
    fontSize: 18,
  },
  txtnum: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
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

export default loginCambiarContraseña;
