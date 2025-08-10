export type RecordPhoto = { uri: string; width: number; height: number };
export type KenkenRecord = {
  id?: number;
  createdAt: number;
  projectCode?: string; // QR から
  room?: string;
  part: string; // 部位
  symptom: string; // 現象
  note?: string;
  photos: RecordPhoto[];
  synced?: 0 | 1;
};
