import { byId } from "./db";
export async function uploadRecord(id: number, apiBase: string) {
  const rec = byId(id);
  if (!rec) return { ok: false };
  // TODO: 画像をmultipartで送信する実装（サーバ用意後に切替）
  // いまは成功扱い
  return { ok: true };
}
