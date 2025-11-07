import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";

export default function CustomDrawerContent(props) {
  const router = useRouter();

  // ✅ Proper logout handling
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth); // ✅ Log user out of Firebase
              router.replace("/"); // ✅ Navigate to login screen (or "/index" if that's your login)
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* 🔷 Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-filled/96/00FFFF/user.png",
          }}
          style={styles.profileIcon}
        />
        <Text style={styles.username}>Hey Tate</Text>
      </View>

      <View style={styles.divider} />

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* 🔻 Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-filled/50/00FFFF/logout-rounded.png",
          }}
          style={styles.logoutIcon}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1C",
    paddingVertical: 10,
  },
  header: {
    alignItems: "center",
    marginVertical: 40,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#00FFFF",
    shadowColor: "#00FFFF",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#00FFFF",
    textShadowColor: "rgba(0,255,255,0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,255,255,0.2)",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginTop: 30,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    tintColor: "#00FFFF",
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    color: "#00FFFF",
    fontWeight: "600",
  },
});
