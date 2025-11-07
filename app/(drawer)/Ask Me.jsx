import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system/legacy";
import * as Speech from "expo-speech";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRouter } from "expo-router";

const genAI = new GoogleGenerativeAI("AIzaSyBCPb98ap8EMt9ICD15gU-4JUJftRrVlqs");

export default function VoiceChat() {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const router = useRouter();

  // 🎙️ Start Recording
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("startRecording error:", err);
    }
  };

  // ⏹️ Stop and send to Gemini
  const stopRecording = async () => {
    try {
      if (!recording) return;
      setRecording(undefined);
      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();
      setLoading(true);

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent([
        {
          inlineData: { mimeType: "audio/m4a", data: base64 },
        },
        {
          text: "Transcribe this audio and respond naturally like a friendly chatbot.",
        },
      ]);

      const text = result.response.text();
      const botMsg = { role: "bot", text };
      setMessages((prev) => [...prev, botMsg]);

      // 🗣️ Speak
      Speech.stop();
      setIsSpeaking(true);
      Speech.speak(text, {
        rate: 1.0,
        pitch: 1.0,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (err) {
      console.error("stopRecording error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🛑 Stop speaking
  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
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
        <View style={styles.headerInner}>
          <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/00FFFF/left.png",
              }}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>🎧 Hey Tate</Text>

          {/* Placeholder for spacing so title stays centered */}
          <View style={{ width: 28 }} />
        </View>
      </LinearGradient>

      {/* CHAT MESSAGES */}
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.message,
              msg.role === "user" ? styles.userMsg : styles.botMsg,
            ]}
          >
            <Text style={styles.msgText}>{msg.text}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="small" color="#00FFFF" />}
      </ScrollView>

      {/* CONTROLS */}
      <View style={styles.controls}>
        {!recording ? (
          <TouchableOpacity onPress={startRecording} activeOpacity={0.8}>
            <LinearGradient
              colors={["#00FFFF", "#0078FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.recordBtn}
            >
              <Text style={styles.recordText}>🎙️ Start Talking</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={stopRecording} activeOpacity={0.8}>
            <LinearGradient
              colors={["#FF3B3B", "#990000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.stopBtn}
            >
              <Text style={styles.stopText}>⏹️ Stop Recording</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={stopSpeaking}
          style={[styles.stopSpeakBtn, { opacity: isSpeaking ? 1 : 0.5 }]}
          disabled={!isSpeaking}
        >
          <Text style={styles.stopSpeakText}>🛑 Stop Speaking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🌌 Dark Futuristic Theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1C",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0,255,255,0.2)",
    marginBottom: 10,
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Keeps title centered
    paddingHorizontal: 10,
  },
  backButton: {
    width: 28,
    height: 28,
  },
  backIcon: {
    width: 28,
    height: 28,
    tintColor: "#00FFFF",
  },
  headerTitle: {
    color: "#00FFFF",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0,255,255,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    textAlign: "center",
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  message: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: "80%",
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#1A1F2E",
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.2)",
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#00FFFF",
  },
  msgText: {
    fontSize: 15,
    color: "#000000ff",
  },
  controls: {
    alignItems: "center",
    paddingBottom: 80,
  },
  recordBtn: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  stopBtn: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
    shadowColor: "#FF0000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  recordText: {
    color: "#0A0F1C",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  stopText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  stopSpeakBtn: {
    marginTop: 12,
    backgroundColor: "#1E2433",
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.3)",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  stopSpeakText: {
    color: "#00FFFF",
    fontWeight: "bold",
  },
});
