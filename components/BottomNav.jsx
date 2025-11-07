import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function BottomNav() {
  const router = useRouter();
  const path = usePathname();

  const tabs = [
    {
      label: "Home",
      icon: "https://img.icons8.com/fluency-systems-filled/48/00FFFF/home.png",
      route: "/home",
    },
    {
      label: "Chat",
      icon: "https://img.icons8.com/fluency-systems-filled/48/00FFFF/chat.png",
      route: "/chat",
    },
     {
  label: "Speak",
  icon: "https://img.icons8.com/fluency-systems-filled/48/00ffff/microphone.png",
  route: "/Ask Me",
},
    
    {
      label: "Profile",
      icon: "https://img.icons8.com/fluency-systems-filled/48/00FFFF/user.png",
      route: "/Profile",
    },
  ];

  return (
    <View style={styles.navContainer}>
      {tabs.map((tab, index) => {
        const isActive = path === tab.route;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(tab.route)}
            style={styles.navItem}
          >
            <View
              style={[
                styles.iconWrapper,
                isActive && styles.activeIconWrapper,
              ]}
            >
              <Image
                source={{ uri: tab.icon }}
                style={[styles.icon, isActive && styles.activeIcon]}
              />
            </View>
            <Text
              style={[styles.label, isActive && styles.activeLabel]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(20, 26, 42, 0.9)",
    borderRadius: 25,
    paddingVertical: 12,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.2)",
  },
  navItem: { alignItems: "center", flex: 1 },
  iconWrapper: {
    backgroundColor: "transparent",
    padding: 8,
    borderRadius: 20,
  },
  activeIconWrapper: {
    backgroundColor: "rgba(0,255,255,0.1)",
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: "#B0BEC5",
  },
  activeIcon: {
    tintColor: "#00FFFF",
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  activeLabel: {
    color: "#00FFFF",
    fontWeight: "bold",
  },
});
