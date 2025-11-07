import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import BottomNav from "../../components/BottomNav";
import { LinearGradient } from "expo-linear-gradient";

export default function Privacy() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#0A0F1C", "#141A2A", "#1E2638"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-filled/200/00FFFF/lock--v1.png",
          }}
          style={styles.image}
        />

        <Text style={styles.text}>
          At <Text style={styles.highlight}>Hey Tate</Text>, your privacy is our top priority. 
          We are committed to protecting your personal data and ensuring a secure experience 
          throughout your journey of growth and motivation.
        </Text>

        <Text style={styles.text}>
          We collect minimal information solely to improve your experience and never share your 
          data with third parties without your consent.
        </Text>

        <View style={styles.separator} />

        <Text style={styles.subtitle}>1. Data Collection</Text>
        <Text style={styles.text}>
          We only gather essential data such as your email for authentication and usage insights 
          to improve app performance.
        </Text>

        <Text style={styles.subtitle}>2. Data Protection</Text>
        <Text style={styles.text}>
          All stored data is encrypted and securely managed. We use industry-standard 
          security protocols to prevent unauthorized access.
        </Text>

        <Text style={styles.subtitle}>3. Your Control</Text>
        <Text style={styles.text}>
          You can delete your account or request data removal anytime through your profile or by 
          contacting support.
        </Text>

        <View style={styles.separator} />

        <Text style={styles.footerText}>
          Your trust drives us forward. Thank you for being part of Hey Tate.
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
