import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adhyayan AI</Text>
      <Text style={styles.subtitle}>
        Smart Multimodal Learning & Doubt Resolution
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#a1a1aa",
    textAlign: "center"
  }
});
