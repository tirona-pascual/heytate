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

export default function Training() {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const explanationText = `
  Every training meeting should have a clear purpose and structure.
  Sales reps learn best when sessions are organized, engaging, and repetitive.

  Start each meeting with a question and answer session to clarify doubts.
  Spend most of the time practicing—alternating between block and randomized formats.
  Include focused product or service training, and introduce incentives to keep motivation high.
  Set measurable goals, review previous results, and end with motivation to inspire the team.

  Create a motivating environment with quotes or leaderboards, 
  and occasionally change locations to keep energy fresh.
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
        <Text style={styles.headerTitle}>Training Meetings</Text>
        <View style={{ width: 30 }} />
      </LinearGradient>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-filled/200/00FFFF/conference.png",
          }}
          style={styles.bannerImage}
        />

        <Text style={styles.sectionHeading}>🧩 Main Points Explained</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purposeful Structure</Text>
          <Text style={styles.sectionText}>
            Every training meeting should have a reason behind it and follow a
            consistent structure made up of six components.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Handle Other Topics Separately</Text>
          <Text style={styles.sectionText}>
            If reps have unrelated concerns, they should discuss them before or
            after the meeting to stay on topic and maintain focus.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Six Core Components</Text>

          <Text style={styles.bullet}>
            • <Text style={styles.bulletHighlight}>Q&A Session:</Text> Start with
            questions and answers to address job-related concerns and clarify confusion.
          </Text>
          <Text style={styles.bullet}>
            • <Text style={styles.bulletHighlight}>Practice:</Text> Dedicate most of
            the meeting to role-playing and skill-building. Alternate between
            block and randomized practice for variety and realism.
          </Text>
          <Text style={styles.bullet}>
            • <Text style={styles.bulletHighlight}>Product & Service Training:</Text>{" "}
            Deepen reps’ understanding of what they sell with insights from
            managers or technical leads.
          </Text>
          <Text style={styles.bullet}>
            • <Text style={styles.bulletHighlight}>Incentives:</Text> Announce or
            reward incentives during meetings to boost motivation.
          </Text>
          <Text style={styles.bullet}>
            • <Text style={styles.bulletHighlight}>Goal Setting & Accountability:</Text>{" "}
            Reps set measurable goals and review previous ones to maintain accountability.
          </Text>
          <Text style={styles.bullet}>
            • <Text style={styles.bulletHighlight}>Motivation:</Text> End with
            something uplifting—a quote, short video, or team cheer—to build unity.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bonus Tips</Text>
          <Text style={styles.sectionText}>
            <Text style={styles.bulletHighlight}>Create an inspiring environment:</Text>{" "}
            Use motivational quotes, posters, and leaderboards to keep spirits high.{"\n\n"}
            <Text style={styles.bulletHighlight}>Vary the location:</Text> Switch up
            meeting spots occasionally (like a poolside or bowling alley) to refresh energy
            and engagement.
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
  bullet: {
    color: "#E0E0E0",
    fontSize: 14,
    marginVertical: 4,
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
