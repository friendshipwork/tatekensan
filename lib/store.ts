import AsyncStorage from "@react-native-async-storage/async-storage";
const QUEUE_KEY = "kenken:queue";
export async function enqueue(id: number) {
  const raw = (await AsyncStorage.getItem(QUEUE_KEY)) ?? "[]";
  const arr = JSON.parse(raw) as number[];
  if (!arr.includes(id)) { arr.push(id); await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(arr)); }
}
export async function dequeueAll() {
  const raw = (await AsyncStorage.getItem(QUEUE_KEY)) ?? "[]";
  await AsyncStorage.removeItem(QUEUE_KEY);
  return JSON.parse(raw) as number[];
}
