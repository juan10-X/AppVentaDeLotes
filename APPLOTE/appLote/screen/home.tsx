import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { PieChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { symbolicate } from "react-native/types_generated/Libraries/LogBox/Data/LogBoxSymbolication";
import Animated from "react-native-reanimated";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;

const API_URL = "http://10.90.221.207:90";

const home = ({ route, navigation }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const { nombre, rol } = route.params || {};
  // Aseguramos que route.params exista
  // console.log("rol recibido:", rol);// Aseguramos que route.params exista

  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // --- 2. LÓGICA DE COMUNICACIÓN CON EL PA ---
  const cargarDashboard = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Dashboard/dashboard_ResumenGeneral`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setDatos(data[0]); // Guardamos la primera fila del PA
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(() => {
    cargarDashboard();
  });

  const DashCard = ({ titulo, valor, icono, color }) => (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <MaterialCommunityIcons name={icono} size={28} color={color} />

      <View style={styles.info}>
        <Text style={styles.cardTitle}>{titulo}</Text>
        <Text style={styles.cardValue}>{valor}</Text>
      </View>
    </View>
  );

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#1A237E" />
      </View>
    );

  // Configuración de la gráfica con tus datos del PA
  const pieData = [
    {
      name: "Vendidos",
      population: datos?.TotalVendidos || 0,
      color: "#1A237E",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Libres",
      population: datos?.TotalLotes - datos?.TotalVendidos || 0,
      color: "#E0E0E0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];
  const cerrarSesion = () => {
    // Simplemente redirigimos y reseteamos el historial
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }], // Cambia 'Login' por el nombre exacto de tu pantalla inicial
    });
  };
  return (
    <View>
      <View
        style={{ width: "100%", height: "11%", backgroundColor: "#ffffff" }}
      >
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.textheader}>Bienvenido:</Text>
            <Text style={styles.textheader2}>{nombre || "Usuario"}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnsalir} onPress={cerrarSesion}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
                salir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={cargarDashboard} />
        }
      >
        {rol !== "Cliente" && (
          <View
            style={styles.container}

            // refreshControl={<RefreshControl
            // refreshing={refreshing}
            // onRefresh={cargarDashboard} />}
          >
            <Text style={styles.header}>Dashboard de Ventas</Text>

            {/* Zona de Dinero */}

            <View style={styles.mainBox}>
              <Text style={styles.mainTitle}>Cartera Total por Cobrar</Text>
              <Text style={styles.mainAmount}>
                S/ {datos?.CarteraTotalFutura || "0.00"}
              </Text>
            </View>
            <View style={styles.chartBox}>
              <Text style={styles.chartTitle}>Ocupación de Lotes</Text>
              <PieChart
                data={pieData} // <--- AQUÍ ES DONDE SE LLAMA A LA CONSTANTE
                width={screenWidth - 60}
                height={200}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor={"population"} // Le dice a la gráfica que use el número de 'population'
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute // Para que muestre el número exacto (ej. 50) y no solo el %
              />
            </View>

            {/* Grid de Métricas */}
            <View style={styles.grid}>
              <DashCard
                titulo="Recaudado"
                valor={`S/ ${datos?.RecaudadoHistorico}`}
                icono="cash-check"
                color="#4CAF50"
              />

              <DashCard
                titulo="Mora Hoy"
                valor={`S/ ${datos?.DineroVencidoHoy}`}
                icono="alert-circle"
                color="#F44336"
              />

              <DashCard
                titulo="Lotes"
                valor={`${datos?.TotalVendidos} / ${datos?.TotalLotes}`}
                icono="home-group"
                color="#2196F3"
              />

              <DashCard
                titulo="Deudas"
                valor={datos?.CantidadDeudores}
                icono="account-alert"
                color="#FF9800"
              />
            </View>

            <Text
              style={{
                marginTop: 20,
                fontWeight: "bold",
                color: "#069488",
                fontSize: 18,
              }}
            >
              Gestion de Usuarios:
            </Text>
            <View style={styles.grid}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Rproyecto", { nombre, rol })
                }
                style={styles.btnRegistrar}
              >
                <Text style={styles.btnRegisText}>Registrar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnModificar}>
                <Text style={styles.btnRegisText}>Modificar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnAnular}>
                <Text style={styles.btnRegisText}>Anular</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: tabBarHeight + 20 }}></View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnsalir: {
    backgroundColor: "#f30a0a9c",
    marginRight: 15,
    height: 40,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  headerContainer: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 5,
    backgroundColor: "#ffffff",
    paddingTop: 40,
    height: 99,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
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
  container: {
    width: "100%",
    minHeight: screenWidth,
    backgroundColor: "#e4f5f3",
    paddingTop: 20,
    padding: 10,
    paddingBottom: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#069488",
  },
  mainBox: {
    backgroundColor: "#09caba",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: 14,
    textTransform: "uppercase",
  },
  mainAmount: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#FFF",
    width: "48%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 5,
  },
  info: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 11,
    color: "#666",
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  chartBox: {
    backgroundColor: "#FFF",

    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    // MARGEN NEGATIVO para que suba y "pise" el azul
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    zIndex: 2, // Asegura que esté por encima
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  btnRegistrar: {
    backgroundColor: "#29c268",
    width: 120,
    height: 50,

    marginBottom: 5,
    marginTop: 5,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnModificar: {
    backgroundColor: "#ff761a",
    width: 120,
    height: 50,

    marginBottom: 5,
    marginTop: 5,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnAnular: {
    backgroundColor: "#d3002e",
    width: 120,
    height: 50,

    marginBottom: 5,
    marginTop: 5,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnRegisText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default home;
