import { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => { if (!permission) requestPermission(); }, [permission]);

  function onBarcodeScanned({ data }: { data: string }) {
    if (scanned) return; setScanned(true);
    // 例: kenken://project/PRJ001?room=302
    try {
      const url = new URL(data);
      const projectCode = url.pathname.split("/")[2];
      const room = url.searchParams.get("room") ?? undefined;
      router.replace({ pathname: "/capture", params: { projectCode, room } });
    } catch {
      router.replace({ pathname: "/capture", params: { projectCode: data } });
    }
  }

  if (!permission?.granted) return <Button title="カメラ許可" onPress={requestPermission} />;

  return (
    <View style={{ flex: 1 }}>
      <CameraView onBarcodeScanned={onBarcodeScanned} style={{ flex: 1 }} />
      {scanned && <Text style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>読み取り済み</Text>}
    </View>
  );
}
