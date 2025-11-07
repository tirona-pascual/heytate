import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { askGemini } from "../../utils/gemini";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";



export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsProcessing(true);

    try {
      const reply = await askGemini(userMsg.content);
      const botMsg = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("AI error:", err);
      Alert.alert("Error", "Failed to get reply from AI.");
    } finally {
      setIsProcessing(false);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      setTimeout(() => scrollRef.current.scrollToEnd({ animated: true }), 200);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#0D111A", "#141A2A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Image
            source={{ uri: "https://img.icons8.com/ios-filled/50/00FFFF/left.png" }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hey Tate Chatbot</Text>
        <View style={{ width: 30 }} />
      </LinearGradient>

      {/* Chat messages */}
      <ScrollView style={styles.chat} ref={scrollRef}>
        {messages.map((m, i) => (
          <View key={i} style={m.role === "user" ? styles.userWrap : styles.botWrap}>
            <Text style={m.role === "user" ? styles.userText : styles.botText}>
              {m.content}
            </Text>
          </View>
        ))}
        {isProcessing && (
          <View style={{ padding: 10, alignItems: "center" }}>
            <ActivityIndicator color="#00FFFF" />
            <Text style={{ color: "#aaa", marginTop: 5 }}>Processing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input row (moved higher) */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            placeholderTextColor="#8A9AAE"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Image
              source={{
                uri: "https://img.icons8.com/fluency-systems-filled/50/00FFFF/sent.png",
              }}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    shadowRadius: 8,
  },
  backIcon: { width: 24, height: 24, tintColor: "#00FFFF" },
  headerTitle: { fontSize: 20, color: "#E0E0E0", fontWeight: "bold" },

  chat: { flex: 1, padding: 16 },
  userWrap: { alignSelf: "flex-end", marginVertical: 6, maxWidth: "80%" },
  botWrap: { alignSelf: "flex-start", marginVertical: 6, maxWidth: "80%" },
  userText: {
    backgroundColor: "#1A1F2E",
    padding: 10,
    borderRadius: 10,
    color: "#00FFFF",
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.2)",
  },
  botText: {
    backgroundColor: "#00FFFF",
    color: "#0A0F1C",
    padding: 10,
    borderRadius: 10,
    fontWeight: "600",
  },

  inputContainer: {
    paddingBottom: 40, // 👆 moves input higher
    paddingHorizontal: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141A2A",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.1)",
  },
  input: {
    flex: 1,
    color: "#E0E0E0",
    fontSize: 16,
    backgroundColor: "#1E2433",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.2)",
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#00FFFF",
    padding: 10,
    borderRadius: 10,
  },
  sendIcon: { width: 20, height: 20, tintColor: "#0A0F1C" },
});
