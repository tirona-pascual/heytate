import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import BottomNav from "../../components/BottomNav";

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const categories = [
    {
      id: "1",
      title: "Improvement",
      icon: { uri: "https://img.icons8.com/fluency-systems-filled/100/00FFFF/improvement.png" },
      route: "/Improvement",
    },
    {
      id: "2",
      title: "Motivation",
      icon: { uri: "https://img.icons8.com/fluency-systems-filled/100/00FFFF/idea.png" },
      route: "/Motivation",
    },
    {
      id: "3",
      title: "Life Balance",
      icon: { uri: "https://img.icons8.com/fluency-systems-filled/100/00FFFF/scales.png" },
      route: "/LifeBalance",
    },
    {
      id: "4",
      title: "Common Mistakes",
      icon: { uri: "https://img.icons8.com/fluency-systems-filled/100/00FFFF/error.png" },
      route: "/CommonMistakes",
        
    },
    {
      id: "5",
      title: "Sales Flow",
      icon: { uri: "https://img.icons8.com/fluency-systems-filled/100/00FFFF/sales-performance.png" },
      route: "/SalesFlow",
    },
    {
      id: "6",
      title: "Initial Approach",
      icon: { uri: "https://img.icons8.com/fluency-systems-filled/100/00FFFF/handshake.png" },
      route: "/InitialApproach",
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) router.replace("/login");
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(categories);
    } else {
      const lower = search.toLowerCase();
      setFiltered(categories.filter((item) => item.title.toLowerCase().includes(lower)));
    }
  }, [search]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FFFF" />
        <Text style={{ color: "#aaa", marginTop: 10 }}>Loading your session...</Text>
      </View>
    );
  }

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => item.route && router.push(item.route)}
    >
      <View style={styles.iconContainer}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#0D111A", "#141A2A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hi, {user?.email?.split("@")[0] || "User"}!</Text>
            <Text style={styles.subText}>Welcome Back</Text>
          </View>

          {/* Profile Icon */}
          <TouchableOpacity onPress={() => router.push("/Profile")}>
            <View style={styles.profileWrapper}>
              <Image
                source={{
                  uri: "https://img.icons8.com/fluency/96/user-male-circle.png",
                }}
                style={styles.profileImage}
              />
              <View style={styles.onlineDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Image
            source={{ uri: "https://img.icons8.com/ios-filled/50/00FFFF/search--v1.png" }}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#8A9AAE"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </LinearGradient>

      {/* GRID */}
      <FlatList
        data={filtered}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.noResults}>No results found</Text>
        }
      />

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1C" },

  headerGradient: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  greeting: { color: "#E0E0E0", fontSize: 22, fontWeight: "600" },
  subText: { color: "#7A859E", fontSize: 14, marginTop: 2 },

  profileWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "#00FFFF",
  },
  onlineDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00FFFF",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1F2E",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.2)",
  },
  searchIcon: { width: 18, height: 18, tintColor: "#00FFFF", marginRight: 8 },
  searchInput: {
    flex: 1,
    color: "#E0E0E0",
    fontSize: 15,
  },

  grid: { justifyContent: "center", paddingBottom: 120, paddingHorizontal: 10 },

  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141A2A",
    paddingVertical: 25,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  iconContainer: {
    backgroundColor: "#1E2433",
    padding: 14,
    borderRadius: 50,
    marginBottom: 10,
  },
  icon: { width: 50, height: 50, tintColor: "#00FFFF" },
  cardText: { color: "#E0E0E0", fontSize: 15, fontWeight: "500" },

  noResults: {
    color: "#00FFFF",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0F1C",
  },
});
