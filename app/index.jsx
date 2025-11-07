import { useEffect } from "react";
import { useRouter, useNavigationContainerRef } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function IndexRedirect() {
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (navigationRef.isReady()) {
        router.replace("/splash");
      }
    }, 500); // small delay to ensure router is mounted

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0A0F1C",
      }}
    >
      <ActivityIndicator size="large" color="#00FFFF" />
    </View>
  );
}
