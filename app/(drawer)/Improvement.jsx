import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import BottomNav from "../../components/BottomNav";

export default function Improvement() {
  const router = useRouter();

  const topics = [
    {
      title: "Values of Victory",
      icon: { uri: "https://img.icons8.com/fluency-systems-filled/96/00FFFF/medal.png" },
      route: "/ValuesOfVictory",
    },
    {
      title: "Practicing",
      icon: { uri: "https://img.icons8.com/fluency-systems-filled/96/00FFFF/training.png" },
      route: "/Practicing",
    },
    {
      title: "Training Meetings",
      icon: { uri: "https://img.icons8.com/fluency-systems-filled/96/00FFFF/conference.png" },
      route: "/Trainings",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header with futuristic gradient */}
      <LinearGradient
        colors={["#0A0F1C", "#141A2A", "#1E2638"]}
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

        <Text style={styles.headerTitle}>Improvement</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {topics.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.topicBox}
            onPress={() => router.push(item.route)}
          >
            <View style={styles.iconContainer}>
              <Image source={item.icon} style={styles.topicIcon} />
            </View>
            <Text style={styles.topicText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
        <BottomNav />
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
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  backIcon: { width: 26, height: 26, tintColor: "#00FFFF" },
  headerTitle: {
    color: "#00FFFF",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "#00FFFF60",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  content: { paddingHorizontal: 20, paddingVertical: 30 },
  topicBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141A2A",
    borderRadius: 14,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.1)",
    shadowColor: "#00FFFF",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  iconContainer: {
    backgroundColor: "#1E2638",
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.2)",
  },
  topicIcon: { width: 40, height: 40, tintColor: "#00FFFF" },
  topicText: { fontSize: 16, fontWeight: "600", color: "#E0F7FA" },
});
