import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";


import home from "./screen/home";
import proyectos from "./screen/proyectos";
import ListarProyectos from "./screen/Proyectos/ListarProyectos";

import clientes from "./screen/clientes";
import asesor from "./screen/asesor";
import Ventas from "./screen/Ventas";
import login from "./screen/login";

const Tab = createBottomTabNavigator();

const bottomTabs = ({ route }) => {
  const { nombre, rol, idUsuario } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#069488",
        headerShown: false,
      }}
    >
      {rol !== "Cliente" && (
        <Tab.Screen
          name="Home"
          component={home}
          initialParams={{ rol, nombre, idUsuario }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Proyectos"
        component={ListarProyectos}
        initialParams={{ rol, nombre, idUsuario }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {rol !== "Cliente" && (
        <Tab.Screen
         name="Asesor"
         component={asesor}
         initialParams={{ rol, nombre, idUsuario }}
         options={{
           tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons
               name="account-tie"
               color={color}
               size={size}
             />
           ),
         }}
       />

      )}
      {rol !== "Cliente" && (
        <Tab.Screen
          name="Clientes"
          component={clientes}
          initialParams={{ rol, nombre, idUsuario }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />

      )}
     
      <Tab.Screen
        name="Ventas"
        component={Ventas}
        initialParams={{ rol, nombre, idUsuario }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker-radius"
              color={color}
              size={size}
            />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};



export default bottomTabs;
