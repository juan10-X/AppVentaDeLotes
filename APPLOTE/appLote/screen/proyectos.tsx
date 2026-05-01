import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';

const API_URL = "http://10.55.241.207:90";

const proyectos = ({ navigation, route }) => {
  const { nombre, rol, idUsuario } = route.params || {};
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 1. Función definida fuera para que sea accesible
  const obtenerProyectos = async () => {
    try {
      setCargando(true);
      const response = await fetch(`${API_URL}/Proyecto/proyecto_Listar`);
      const data = await response.json();
      setProyectos(data);
    } catch (error) {
      console.error("Error al listar proyectos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  if (cargando)
    return (
      <ActivityIndicator size="large" color="#069488" style={{ flex: 1 }} />
    );

  return (
    <View style={styles.container}>
      {rol !== "Cliente" && (
        <View style={styles.grid}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ListarProyectos", { 
                nombre, 
                rol, 
                onRefresh: obtenerProyectos 
            })}
            style={styles.btnRegistrar}
          >
            <Text style={styles.btnRegisText}>Ver Proyectos</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Agregamos un paddingBottom fijo para que no choque abajo */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Selecciona un Proyecto:</Text>

        {proyectos.map((proyecto, index) => (
          <TouchableOpacity
            key={proyecto.IdProyecto ? proyecto.IdProyecto.toString() : index.toString()}
            style={styles.btnProyecto}
            onPress={() =>
              navigation.navigate("DetalleProyecto", {
                idProyecto: proyecto.IdProyecto,
                urlCSV: proyecto.ImagenUrl,
                info: proyecto,
                idUsuario,
              })
            }
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.txtNombre}>{proyecto.Nombre}</Text>
              <Text style={styles.txtUbicacion}>{proyecto.Ubicacion}</Text>
            </View>
            <Text style={styles.flecha}> {">"} </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#069488",
    marginBottom: 20,
  },
  btnProyecto: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  txtNombre: { fontSize: 18, fontWeight: "bold", color: "#333" },
  txtUbicacion: { fontSize: 14, color: "#666" },
  flecha: { fontSize: 20, color: "#069488", fontWeight: "bold" },
  grid: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  btnRegistrar: {
    backgroundColor: "#29c268",
    paddingHorizontal: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnRegisText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default proyectos;
