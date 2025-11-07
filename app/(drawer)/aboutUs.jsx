import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import BottomNav from "../../components/BottomNav";
import { LinearGradient } from "expo-linear-gradient";

export default function AboutUs() {
  return (
    <View style={styles.container}>
      {/* Header with gradient */}
      <LinearGradient
        colors={["#0A0F1C", "#141A2A", "#1E2638"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>About Us</Text>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-filled/200/00FFFF/team.png",
          }}
          style={styles.image}
        />

        <Text style={styles.text}>
          <Text style={styles.highlight}>Hey Tate</Text> is your personal guide to self-improvement, 
          motivation, and growth. We believe success starts with mindset — through consistent learning, 
          resilience, and confidence.
        </Text>

        <Text style={styles.text}>
          Our mission is to empower individuals to unlock their full potential by 
          blending technology, motivation, and discipline in a sleek, AI-driven experience.
        </Text>

        <View style={styles.separator} />

        <Text style={styles.subtitle}>Our Vision</Text>
        <Text style={styles.text}>
          To help people achieve mastery in every area of life — from mental discipline 
          to personal development — through smart, engaging tools.
        </Text>

        <Text style={styles.footerText}>Together, we rise. 🚀</Text>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1C" },

  // Header
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#00FFFF",
    textAlign: "center",
    textShadowColor: "#00FFFF55",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  // Content
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
