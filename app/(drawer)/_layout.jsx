import React from "react";
import { Image, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../../components/customDrawer";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#0A0F1C" },
        headerTintColor: "#00FFFF",
        drawerActiveTintColor: "#00FFFF",
        drawerInactiveTintColor: "#B0BEC5",
        drawerStyle: { backgroundColor: "#141A2A" },
        drawerType: "front",
        overlayColor: "rgba(0,0,20,0.6)",
        drawerLabelStyle: { fontSize: 15, fontWeight: "500" },
        // ✅ Hide drawer icon globally (default)
        headerLeft: () => <View />, // replaces the icon with an empty view
      }}
    >
      {/* ✅ Visible Drawer Screens */}
      <Drawer.Screen
        name="aboutUs"
        options={{
          title: "About Us",
          drawerIcon: () => (
            <Image
              source={{
                uri: "https://img.icons8.com/fluency-systems-filled/24/00FFFF/info.png",
              }}
              style={{ width: 22, height: 22, tintColor: "#00FFFF" }}
            />
          ),
          headerLeft: () => <View />, // also ensures no icon for this screen
        }}
      />

      <Drawer.Screen
        name="privacy"
        options={{
          title: "Privacy Policy",
          drawerIcon: () => (
            <Image
              source={{
                uri: "https://img.icons8.com/fluency-systems-filled/24/00FFFF/lock--v1.png",
              }}
              style={{ width: 22, height: 22, tintColor: "#00FFFF" }}
            />
          ),
          headerLeft: () => <View />,
        }}
      />

      <Drawer.Screen
        name="terms"
        options={{
          title: "Terms & Conditions",
          drawerIcon: () => (
            <Image
              source={{
                uri: "https://img.icons8.com/fluency-systems-filled/24/00FFFF/document.png",
              }}
              style={{ width: 22, height: 22, tintColor: "#00FFFF" }}
            />
          ),
          headerLeft: () => <View />,
        }}
      />

      {/* 🚫 Hidden Screens */}
      {[
        "home",
        "chat",
        "lifebalance",
        "motivation",
        "Improvement",
        "ValuesOfVictory",
        "Profile",
        "Ask Me",
        "Motivation",
        "Trainings",
        "Practicing",
        "Common Mistakes",
        "Life Balance",
        "motivationDetails",
        "CommonMistakesDetails",
        "CommonMistakes",
        "LifeBalanceDetails",
        "SalesFlowDetails",
        "SalesFlow",
        "LifeBalance",
        "InitialApproach",
        "IniDetails",
      ].map((name) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            drawerLabel: () => null,
            title: "",
            drawerItemStyle: { height: 0 },
            headerLeft: () => <View />, // hides icon for hidden screens too
          }}
        />
      ))}
    </Drawer>
  );
}
