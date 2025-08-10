import { useEffect, useState } from "react";
import { View, TextInput, Button, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRouter, useLocalSearchParams } from "expo-router";
import { insert } from "../lib/db";
import type { KenkenRecord, RecordPhoto } from "../lib/types";

export default function Capture() {
  const router = useRouter();
  const { projectCode, room } = useLocalSearchParams<{projectCode?: string; room?: string}>();
  const [part, setPart] = useState("");
  const [symptom, setSymptom] = useState("");
  const [note, setNote] = useState("");
  const [photos, setPhotos] = useState<RecordPhoto[]>([]);

  useEffect(() => { MediaLibrary.requestPermissionsAsync(); }, []);

  async function addPhoto() {
    const res = await ImagePicker.launchCameraAsync({ quality: 0.8, exif: false });
    if (!res.canceled) {
      const a = res.assets[0];
      setPhotos(p => [...p, { uri: a.uri, width: a.width ?? 0, height: a.height ?? 0 }]);
    }
  }

  function save() {
    const rec: KenkenRecord = {
      createdAt: Date.now(), projectCode: projectCode as string, room: room as string,
      part, symptom, note, photos, synced: 0
    };
    insert(rec);
    router.replace("/list");
  }

  return (
    <ScrollView contentContainerStyle={{ gap: 12, padding: 16 }}>
      <Button title="写真を撮る" onPress={addPhoto} />
      <TextInput placeholder="部位" value={part} onChangeText={setPart} style={{ borderWidth:1, padding:8 }} />
      <TextInput placeholder="現象" value={symptom} onChangeText={setSymptom} style={{ borderWidth:1, padding:8 }} />
      <TextInput placeholder="メモ" value={note} onChangeText={setNote} style={{ borderWidth:1, padding:8 }} />
      <Button title="保存" onPress={save} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {photos.map((p, i) => (<Image key={i} source={{ uri: p.uri }} style={{ width: 120, height: 120 }} />))}
      </View>
    </ScrollView>
  );
}
