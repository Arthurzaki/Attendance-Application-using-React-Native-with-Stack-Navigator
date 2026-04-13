import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const initialHistory = [
  { id: "1", course: "Web Programming", date: "2026-03-01", status: "Absent" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
];

const Home = () => {
  const [historyData, setHistoryData] = useState(initialHistory);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [note, setNote] = useState(""); // State untuk input catatan

  // Hitung Total Present & Absent secara otomatis
  const totalPresent = historyData.filter((item) => item.status === "Present").length;
  const totalAbsent = historyData.filter((item) => item.status === "Absent").length;

  // Efek Jam Real-time
  useEffect(() => {
    const timer = setInterval(() => {
      const timeString = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    if (isCheckedIn) return;

    const newAttendance = {
      id: Date.now().toString(),
      course: "Mobile Programming",
      date: "16/3/2026", // Sesuai contoh di gambar
      status: "Present",
    };

    setHistoryData([newAttendance, ...historyData]);
    setIsCheckedIn(true);
    setNote(""); // Kosongkan catatan setelah check in
    Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyCourse}>{item.course}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <Text style={[styles.statusText, { color: item.status === "Present" ? "#4CAF50" : "#F44336" }]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Attendance App</Text>
        <Text style={styles.clockText}>{currentTime}</Text>
      </View>

      {/* Student Card */}
      <View style={styles.card}>
        <View style={styles.avatarCircle}>
          <MaterialIcons name="person" size={40} color="#555" />
        </View>
        <View>
          <Text style={styles.studentName}>Zaki Fathur</Text>
          <Text style={styles.studentDetail}>NIM : 0920240025</Text>
          <Text style={styles.studentDetail}>Class : TRPL-2B</Text>
        </View>
      </View>

      {/* Today's Class Card */}
      <View style={styles.mainCard}>
        <Text style={styles.cardTitle}>Today's Class</Text>
        <Text style={styles.courseName}>Mobile Programming</Text>
        <Text style={styles.classDetail}>08:00 - 10:00</Text>
        <Text style={styles.classDetail}>Lab 3</Text>

        {/* Input Catatan (Hanya muncul jika belum check-in) */}
        {!isCheckedIn && (
          <TextInput
            style={styles.input}
            placeholder="Tulis catatan (cth: Hadir lab)"
            value={note}
            onChangeText={setNote}
          />
        )}

        <TouchableOpacity
          style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]}
          onPress={handleCheckIn}
          disabled={isCheckedIn}
        >
          <Text style={styles.buttonText}>{isCheckedIn ? "CHECKED IN" : "CHECK IN"}</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Card (Present & Absent) */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryBox}>
          <Text style={[styles.summaryNumber, { color: "#4CAF50" }]}>{totalPresent}</Text>
          <Text style={styles.summaryLabel}>Total Present</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={[styles.summaryNumber, { color: "#F44336" }]}>{totalAbsent}</Text>
          <Text style={styles.summaryLabel}>Total Absent</Text>
        </View>
      </View>

      {/* History Section */}
      <View style={styles.mainCard}>
        <Text style={styles.cardTitle}>Attendance History</Text>
        <FlatList
          data={historyData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F5F5" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  clockText: { fontSize: 16, fontWeight: "bold", color: "#4A80F0" },
  card: { flexDirection: "row", backgroundColor: "#FFF", padding: 15, borderRadius: 12, elevation: 2, marginBottom: 20, alignItems: "center" },
  avatarCircle: { backgroundColor: "#EEE", padding: 10, borderRadius: 50, marginRight: 15 },
  studentName: { fontSize: 17, fontWeight: "bold" },
  studentDetail: { fontSize: 13, color: "#666" },
  mainCard: { backgroundColor: "#FFF", padding: 15, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 17, fontWeight: "bold", marginBottom: 10 },
  courseName: { fontSize: 15, fontWeight: "bold" },
  classDetail: { fontSize: 14, color: "#444" },
  input: { backgroundColor: "#F0F0F0", padding: 12, borderRadius: 8, marginTop: 15, fontSize: 14 },
  button: { marginTop: 15, padding: 13, borderRadius: 8, alignItems: "center" },
  buttonActive: { backgroundColor: "#4A80F0" },
  buttonDisabled: { backgroundColor: "#A0C4FF" },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  summaryCard: { flexDirection: "row", backgroundColor: "#FFF", padding: 15, borderRadius: 12, elevation: 2, marginBottom: 20 },
  summaryBox: { flex: 1, alignItems: "center" },
  summaryNumber: { fontSize: 24, fontWeight: "bold" },
  summaryLabel: { fontSize: 12, color: "#888" },
  historyItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  historyCourse: { fontSize: 15, fontWeight: "bold", color: "#333" },
  historyDate: { fontSize: 12, color: "#999" },
  statusText: { fontWeight: "bold" },
});

export default Home;