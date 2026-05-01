import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = "http://10.55.241.207:90";

const ListarProyectos = ({ navigation, route }) => {
  const { nombre, rol, idUsuario, onRefresh } = route.params || {};
  {
  }
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerProyectos = async () => {
    try {
      const response = await fetch(`${API_URL}/Proyecto/proyecto_Listar`);
      const data = await response.json();
      setProyectos(data);
    } catch (error) {
      console.error("Error al listar proyectos:", error);
    } finally {
      setCargando(false);
    }
  };

  const anularProyecto = async (idProyecto) => {
    try {
      const response = await fetch(
        `${API_URL}/Proyecto/proyecto_Anular/${idProyecto}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        Alert.alert("Éxito", "Proyecto anulado correctamente");
        obtenerProyectos();
      } else {
        const errorMsg = await response.text();
        console.log("Error del server:", errorMsg);
        Alert.alert("Error", "No se pudo anular el proyecto");
      }
    } catch (error) {
      console.error("Error al anular proyecto:", error);
      Alert.alert("Error", "Error de conexión con el servidor");
    }
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      obtenerProyectos();
    }, []),
  );

  if (cargando)
    return (
      <ActivityIndicator size="large" color="#069488" style={{ flex: 1 }} />
    );
  const cerrarSesion = () => {
    // Simplemente redirigimos y reseteamos el historial
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }], // Cambia 'Login' por el nombre exacto de tu pantalla inicial
    });
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.textheader}>Bienvenido:</Text>
          <Text style={styles.textheader2}>{nombre || "Usuario"}</Text>
        </View>

        <TouchableOpacity style={styles.btnsalir} onPress={cerrarSesion}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
            salir
          </Text>
        </TouchableOpacity>
      </View>
      <View></View>
      <Text style={styles.title}>Gestion de Proyectos:</Text>
      <Text style={styles.subtitle}>Selecciona un Proyecto:</Text>

      <View style={styles.form}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
        >
          {proyectos.map((proyecto, index) => (
            <TouchableOpacity
              key={
                proyecto.IdProyecto
                  ? proyecto.IdProyecto.toString()
                  : index.toString()
              }
              style={styles.card}
              onPress={() =>
                navigation.navigate("DetalleProyecto", {
                  idProyecto: proyecto.IdProyecto,
                  urlCSV: proyecto.ImagenUrl,
                  info: proyecto,
                  idUsuario,
                })
              }
            >
              <View style={styles.grid}>
                <Text style={styles.cardTitle}>
                  {proyecto.Nombre || "Proyecto sin nombre"}
                </Text>

                {rol !== "Cliente" && (
                  <TouchableOpacity
                    style={styles.opciones}
                    onPress={() =>
                      Alert.alert(
                        "Opciones para Proyecto",
                        `¿Qué deseas hacer con ${proyecto.Nombre}?`,
                        [
                          {
                            text: "Anular",
                            onPress: () => anularProyecto(proyecto.IdProyecto),
                          },
                          {
                            text: "Modificar",
                            onPress: () =>
                              navigation.navigate("ModificarProyecto", {
                                proyecto,
                                onRefresh: obtenerProyectos,
                              }),
                          },
                          {
                            text: "Cancelar",
                            style: "cancel",
                          },
                        ],
                      )
                    }
                  >
                    <Text style={styles.textOpciones}>⋮</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.cardText}>
                Ubicación: {proyecto.Ubicacion || "N/A"}
              </Text>
              <Text style={styles.cardText}>
                Ubicación: {proyecto.NumeroHectareas || "N/A"}
              </Text>
              <Text style={styles.cardText}>
                Estado: {proyecto.Estado || "N/A"}
              </Text>
              <Text style={styles.cardText}>
                Fecha Registro: {proyecto.FechaRegistro || "N/A"}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        {rol !== "Cliente" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Rproyecto", { onRefresh: obtenerProyectos })
            }
            style={styles.btnRegistrar}
          >
            <Text style={styles.btnRegisText}>Nuevo Proyecto</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4f5f3",
    padding: 20,
    paddingTop: 50,
  },
  textheader: {
    fontWeight: "500",
    padding: 10,
    color: "#069488",
    fontSize: 17,
  },
  textheader2: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#069488",
  },
  btnsalir: {
    backgroundColor: "#f30a0a9c",
    marginRight: 15,
    height: 40,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#069488",
    marginBottom: 15,
  },
  form: {
    flex: 1,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: "#069488",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#069488",
  },
  cardText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  opciones: {
    width: 20,
    paddingLeft: 15,
  },
  textOpciones: {
    color: "#069488",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnRegistrar: {
    backgroundColor: "#29c268",
    width: 378,
    height: 50,
    marginBottom: 5,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnRegisText: {
    color: "#fff",
    fontWeight: "bold",
  },
  btnregresar: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default ListarProyectos;
