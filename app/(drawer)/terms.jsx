import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import BottomNav from "../../components/BottomNav";
import { LinearGradient } from "expo-linear-gradient";

export default function Terms() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#0A0F1C", "#141A2A", "#1E2638"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-filled/200/00FFFF/document.png",
          }}
          style={styles.image}
        />

        <Text style={styles.text}>
          Welcome to <Text style={styles.highlight}>Hey Tate</Text>. By using this app, 
          you agree to comply with our terms of service and uphold a respectful community 
          experience for all users.
        </Text>

        <Text style={styles.text}>
          You agree not to misuse the platform, share unauthorized content, or engage in 
          any activities that may disrupt the service or other users.
        </Text>

        <View style={styles.separator} />

        <Text style={styles.subtitle}>Account Responsibility</Text>
        <Text style={styles.text}>
          You are responsible for maintaining the confidentiality of your account credentials 
          and ensuring that your activity complies with applicable laws.
        </Text>

        <Text style={styles.subtitle}>Content Usage</Text>
        <Text style={styles.text}>
          All materials provided in this app, including text, design, and graphics, are 
          intellectual property of Hey Tate and cannot be redistributed or modified without 
          consent.
        </Text>

        <View style={styles.separator} />

        <Text style={styles.footerText}>
          By continuing to use the app, you acknowledge that you have read, understood, 
          and agreed to these terms.
        </Text>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1C" },

  header: {
    paddingTop: 60,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00FFFF",
    textAlign: "center",
    textShadowColor: "#00FFFF55",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  content: { padding: 20, paddingBottom: 100 },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: "#D6EAF8",
    lineHeight: 22,
    marginBottom: 15,
  },
  highlight: {
    color: "#00FFFF",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00FFFF",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(0,255,255,0.2)",
    marginVertical: 20,
  },
  footerText: {
    color: "#9ADBE8",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 15,
  },
});
