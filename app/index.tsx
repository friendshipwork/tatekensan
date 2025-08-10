import { Link } from "expo-router";
import { View, Text } from "react-native";
import { useEffect } from "react";
import { init } from "../lib/db";

export default function Home() {
  useEffect(() => { init(); }, []);
  return (
    <View style={{ gap: 16, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>建検さん（MVP）</Text>
      <Link href="/capture">不具合登録</Link>
      <Link href="/scan">QR 読み取り</Link>
      <Link href="/list">一覧</Link>
    </View>
  );
}
