import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "建検さん" }} />
      <Stack.Screen name="capture" options={{ title: "写真/添付" }} />
      <Stack.Screen name="scan" options={{ title: "QR 読み取り" }} />
      <Stack.Screen name="list" options={{ title: "一覧" }} />
      <Stack.Screen name="detail" options={{ title: "詳細" }} />
    </Stack>
  );
}
