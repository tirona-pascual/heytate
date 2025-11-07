import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter, useLocalSearchParams } from "expo-router";
import { app } from "../../FirebaseConfig";

export default function LifeBalanceDetails() {
  const router = useRouter();
  const { topicId } = useLocalSearchParams();
  const db = getFirestore(app);

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "Life Balance", topicId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          console.log("No such document:", topicId);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [topicId]);

  const handleSpeak = () => {
  if (!content) return;

  if (isSpeaking) {
    Speech.stop();
    setIsSpeaking(false);
    return;
  }

  const textToSpeak = content.discussion
    ? content.discussion
    : [
        content.title,
        content.subtitle || "",
        ...(content.sections?.flatMap((s) => [s.heading, ...s.paragraphs]) || []),
      ].join(". ");

  // Split into sentences for natural pauses
  const sentences = textToSpeak.split(". ").map(s => s.trim()).filter(Boolean);

  setIsSpeaking(true);

  const speakSentence = (index = 0) => {
    if (index >= sentences.length) return;

    Speech.speak(sentences[index] + ".", {
      language: "en-US",
      rate: 1.0,       // normal speed, can adjust 0.9-1.1
      pitch: 1.1,      // slightly higher pitch for friendly tone
      voice: "en-US-JennyNeural", // optional, check available voices on your device
      onDone: () => speakSentence(index + 1),
      onStopped: () => setIsSpeaking(false),
    });
  };

  speakSentence();
};

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#00FFFF" />
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No content available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#0D111A", "#141A2A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.push("/LifeBalance")}>
          <Image
            source={{ uri: "https://img.icons8.com/ios-filled/50/00FFFF/left.png" }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{content.title}</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {content.banner && (
          <Image source={{ uri: content.banner }} style={styles.bannerImage} />
        )}

        {content.subtitle && (
          <Text style={styles.sectionHeading}>🧩 {content.subtitle}</Text>
        )}

        {content.sections?.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.heading}</Text>
            {section.paragraphs.map((p, i) => (
              <Text key={i} style={styles.sectionText}>{p}</Text>
            ))}
          </View>
        ))}

      
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  backIcon: { width: 24, height: 24, tintColor: "#00FFFF" },
  headerTitle: { fontSize: 20, color: "#E0E0E0", fontWeight: "bold" },
  scrollContainer: { padding: 20, paddingBottom: 80 },
  bannerImage: { width: "100%", height: 180, resizeMode: "contain", alignSelf: "center", marginBottom: 25 },
  sectionHeading: { fontSize: 18, color: "#00FFFF", fontWeight: "700", marginBottom: 15 },
  section: { backgroundColor: "#141A2A", borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "rgba(0,255,255,0.15)", shadowColor: "#00FFFF", shadowOpacity: 0.15, shadowRadius: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#00FFFF", marginBottom: 8 },
  sectionText: { fontSize: 15, color: "#E0E0E0", lineHeight: 22 },
  audioButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#00FFFF", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 50, alignSelf: "center", marginTop: 20, shadowColor: "#00FFFF", shadowOpacity: 0.3, shadowRadius: 6 },
  audioText: { color: "#0A0F1C", fontWeight: "700", fontSize: 16 },
  errorText: { color: "#FF6B6B", textAlign: "center", marginTop: 50 },
});
