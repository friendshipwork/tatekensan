import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { byId } from "../lib/db";

export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const rec = byId(Number(id));
  if (!rec) return null;
  const photos = JSON.parse(rec.photos) as {uri:string}[];
  return (
    <ScrollView contentContainerStyle={{ gap: 8, padding: 12 }}>
      <Text>{new Date(rec.createdAt).toLocaleString()}</Text>
      <Text>{rec.projectCode} {rec.room ?? ""}</Text>
      <Text>{rec.part} / {rec.symptom}</Text>
      {rec.note ? <Text>{rec.note}</Text> : null}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {photos.map((p, i) => (
          <Image key={i} source={{ uri: p.uri }} style={{ width: 160, height: 160 }} />
        ))}
      </View>
    </ScrollView>
  );
}
