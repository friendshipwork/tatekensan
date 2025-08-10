import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { allToday } from "../lib/db";
import { useRouter } from "expo-router";

export default function List() {
  const [items, setItems] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => { setItems(allToday()); }, []);
  return (
    <View style={{ flex:1 }}>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: "/detail", params: { id: item.id } })}>
            <View style={{ padding: 14, borderBottomWidth: 1 }}>
              <Text>{new Date(item.createdAt).toLocaleString()}</Text>
              <Text>{item.projectCode ?? "(未設定)"} {item.room ?? ""}</Text>
              <Text>{item.part} / {item.symptom}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={{ padding: 16 }}>本日の登録はありません</Text>}
      />
    </View>
  );
}
