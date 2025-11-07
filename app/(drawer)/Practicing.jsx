import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";

export default function Practicing() {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const explanationText = `
  Role-playing is essential for learning in sales, even though it might feel awkward at first. 
  It lets you make mistakes and improve before talking to real clients.

  Deliberate practice means focused, structured effort. 
  You work on specific skills just beyond your comfort zone, 
  get feedback, and repeat until mastery.

  There are two types of practice: 
  Block practice — focusing on one skill until it’s mastered. 
  Randomized practice — mixing skills to handle real-world unpredictability.

  The goal is to help sales teams gain confidence, reduce mistakes, 
  and improve faster through consistent, structured training.
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
        <Text style={styles.headerTitle}>Practicing</Text>
        <View style={{ width: 30 }} />
      </LinearGradient>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-filled/200/00FFFF/training.png",
          }}
          style={styles.bannerImage}
        />

        <Text style={styles.sectionHeading}>🧠 Key Concepts Explained</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Role-playing (Practicing)</Text>
          <Text style={styles.sectionText}>
            Many salespeople dislike role-playing because it feels awkward or fake.
            However, it’s crucial for learning since it allows you to make mistakes
            and improve before talking to real customers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deliberate Practice</Text>
          <Text style={styles.sectionText}>
            Based on a 1993 study in the Psychological Review by K. Anders Ericsson,
            deliberate practice means focused learning:
          </Text>

          <View style={styles.bulletList}>
            <Text style={styles.bullet}>
              • <Text style={styles.bulletHighlight}>Focused effort</Text> — Working on specific skills just beyond your comfort zone.
            </Text>
            <Text style={styles.bullet}>
              • <Text style={styles.bulletHighlight}>Feedback</Text> — Receiving input to correct and improve.
            </Text>
            <Text style={styles.bullet}>
              • <Text style={styles.bulletHighlight}>Repetition</Text> — Doing it repeatedly until it becomes natural.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Two Types of Practice in Sales</Text>
          <Text style={styles.sectionText}>
            <Text style={styles.bulletHighlight}>Block Practice</Text> — Repeating a single skill to master it (like closing a sale).{"\n\n"}
            <Text style={styles.bulletHighlight}>Randomized Practice</Text> — Mixing different skills or scenarios to simulate real-world unpredictability.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Purpose</Text>
          <Text style={styles.sectionText}>
            The goal is to help salespeople and leaders structure their practice
            sessions to build confidence, reduce mistakes, and improve faster
            than through experience alone.
          </Text>
        </View>

        {/* 🎧 Play Explanation Button */}
        <TouchableOpacity
          style={[styles.audioButton, isSpeaking && { backgroundColor: "#008B8B" }]}
          onPress={handleSpeak}
        >
          {isSpeaking ? (
            <Image
              source={{
                uri: "https://img.icons8.com/fluency-systems-filled/48/00FFFF/pause.png",
              }}
              style={styles.playIcon}
            />
          ) : (
            <Image
              source={{
                uri: "https://img.icons8.com/fluency-systems-filled/48/00FFFF/play.png",
              }}
              style={styles.playIcon}
            />
          )}
          <Text style={styles.audioText}>
            {isSpeaking ? "Stop Audio" : "Play Explanation"}
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
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  backIcon: { width: 24, height: 24, tintColor: "#00FFFF" },
  headerTitle: { fontSize: 20, color: "#E0E0E0", fontWeight: "bold" },

  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
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
  bulletList: {
    marginTop: 8,
    marginLeft: 8,
  },
  bullet: {
    color: "#E0E0E0",
    fontSize: 14,
    marginVertical: 3,
    lineHeight: 22,
  },
  bulletHighlight: {
    color: "#00FFFF",
    fontWeight: "600",
  },

  // 🎧 Button
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
