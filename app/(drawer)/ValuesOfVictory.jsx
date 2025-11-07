import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";

export default function ValuesOfVictory() {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const explanationText = `
Hard Work:
Giving maximum effort in every sales interaction.
Talking to at least seven prospects per hour.
Typically requires 600 interactions for a rookie to gauge success.

Mental Toughness:
See rejection as a learning opportunity.
Focus on controllable factors and improve them.

Commitment:
Do what you say you will do, when you say you will.
Consistently keeping commitments builds trust and strengthens relationships.
`;

  const handleSpeak = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    Speech.speak(explanationText, {
      language: "en-US",
      pitch: 1,
      rate: 1.0,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#0D111A", "#141A2A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.push("/Improvement")}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/00FFFF/left.png",
            }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Values of Victory</Text>
        <View style={{ width: 30 }} />
      </LinearGradient>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-filled/200/00FFFF/medal.png",
          }}
          style={styles.bannerImage}
        />

        <Text style={styles.sectionHeading}>🧩 Key Concepts Explained</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hard Work</Text>
          <Text style={styles.sectionText}>
            Hard work is often misunderstood—many claim to be hard workers but
            can’t define it. For door-to-door sales, it means:
          </Text>
          <Text style={styles.bullet}>
            • Giving maximum effort in every sales interaction.
          </Text>
          <Text style={styles.bullet}>
            • Talking to at least seven prospects per hour (except when closing a sale takes extra time).
          </Text>
          <Text style={styles.bullet}>
            • The goal is to maximize chances of success; it usually takes about 600 prospect interactions for a rookie to determine if they can succeed.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mental Toughness</Text>
          <Text style={styles.sectionText}>
            Door-to-door sales involve frequent rejection—often a 3% closing ratio. Mentally tough reps:
          </Text>
          <Text style={styles.bullet}>
            • See rejection as a learning opportunity.
          </Text>
          <Text style={styles.bullet}>
            • Focus on what they can control and improve on it, rather than worrying about external factors.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Commitment</Text>
          <Text style={styles.sectionText}>
            Means doing what you say you will do, when you say you’ll do it. Consistently keeping commitments builds trust, strengthens relationships, and can lead to future opportunities.
          </Text>
        </View>

        {/* 🎧 Play Explanation Button */}
        <TouchableOpacity
          style={[styles.audioButton, isSpeaking && { backgroundColor: "#008B8B" }]}
          onPress={handleSpeak}
        >
          <Image
            source={{
              uri: isSpeaking
                ? "https://img.icons8.com/fluency-systems-filled/48/00FFFF/pause.png"
                : "https://img.icons8.com/fluency-systems-filled/48/00FFFF/play.png",
            }}
            style={styles.playIcon}
          />
          <Text style={styles.audioText}>
            {isSpeaking ? "Stop Audio" : "Play Summary"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1C" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  backIcon: { width: 24, height: 24, tintColor: "#00FFFF" },
  headerTitle: { fontSize: 20, color: "#E0E0E0", fontWeight: "bold" },

  scrollContainer: { padding: 20, paddingBottom: 100 },
  bannerImage: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 25,
  },
  sectionHeading: {
    fontSize: 18,
    color: "#00FFFF",
    fontWeight: "700",
    marginBottom: 15,
  },
  section: {
    backgroundColor: "#141A2A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.15)",
    shadowColor: "#00FFFF",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00FFFF",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 15,
    color: "#E0E0E0",
    lineHeight: 22,
  },
  bullet: {
    color: "#E0E0E0",
    fontSize: 14,
    marginVertical: 4,
    lineHeight: 22,
  },

  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00FFFF",
    justifyContent: "center",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: "center",
    marginTop: 25,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  playIcon: { width: 24, height: 24, tintColor: "#0A0F1C", marginRight: 10 },
  audioText: { color: "#0A0F1C", fontWeight: "700", fontSize: 16 },
});
