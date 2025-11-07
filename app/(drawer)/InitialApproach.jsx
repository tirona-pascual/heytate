import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../FirebaseConfig"; // ✅ make sure path is correct
import BottomNav from "../../components/BottomNav";

export default function SalesFlow() {
  const router = useRouter();
  const db = getFirestore(app);

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotivationTopics = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Initial Approach"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTopics(data);
      } catch (error) {
        console.error("Error fetching motivation topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotivationTopics();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#00FFFF" />
      </View>
    );
  }

  // helper function to make document IDs human-readable
  const formatIdToTitle = (id) => {
    if (!id) return "";
    return id
      .replace(/([A-Z])/g, " $1") // add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // capitalize first letter
      .trim();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#0A0F1C", "#141A2A", "#1E2638"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/00FFFF/left.png",
            }}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Initial Approach</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* Dynamic Topics */}
      <ScrollView contentContainerStyle={styles.content}>
        {topics.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.topicBox}
            onPress={() =>
              router.push({
                pathname: "/IniDetails",
                params: { topicId: item.id },
              })
            }
          >
            <View style={styles.leftSection}>
              <View style={styles.iconContainer}>
                <Image
                  source={{
                    uri:
                      item.banner ||
                      "https://img.icons8.com/fluency-systems-filled/96/00FFFF/light-on.png",
                  }}
                  style={styles.topicIcon}
                />
              </View>
              <Text style={styles.topicText}>
                {item.title || formatIdToTitle(item.id)}
              </Text>
            </View>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/24/00FFFF/chevron-right.png",
              }}
              style={styles.chevron}
            />
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
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: "#00FFFF70",
    textShadowRadius: 8,
  },
  content: { paddingHorizontal: 20, paddingVertical: 25 },
  topicBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#141A2A",
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.15)",
  },
  leftSection: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconContainer: {
    backgroundColor: "#1E2638",
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.2)",
  },
  topicIcon: { width: 36, height: 36, tintColor: "#00FFFF" },
  topicText: {
    flex: 1,
    fontSize: 16,
    color: "#E0F7FA",
    fontWeight: "600",
  },
  chevron: { width: 20, height: 20, tintColor: "#00FFFF" },
});
