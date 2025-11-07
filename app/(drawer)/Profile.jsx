import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { useRouter } from "expo-router";
import BottomNav from "../../components/BottomNav";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.replace("/login");
      else setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-filled/256/00FFFF/user-male-circle.png",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.email?.split("@")[0] || "User"}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1C" },

  header: {
    backgroundColor: "#141A2A",
    paddingVertical: 60,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,255,255,0.2)",
    shadowColor: "#00FFFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  title: {
    color: "#00FFFF",
    fontSize: 28,
    fontWeight: "bold",
    textShadowColor: "rgba(0,255,255,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#00FFFF",
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00FFFF",
    marginTop: 10,
  },
  email: {
    color: "#B0BEC5",
    fontSize: 16,
    marginTop: 6,
  },
  logoutButton: {
    backgroundColor: "#00FFFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 40,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  logoutText: {
    color: "#0A0F1C",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
