import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseSync("kenken.db");
export function init() {
  db.execSync(`CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY NOT NULL,
    createdAt INTEGER NOT NULL,
    projectCode TEXT,
    room TEXT,
    part TEXT NOT NULL,
    symptom TEXT NOT NULL,
    note TEXT,
    photos TEXT NOT NULL,
    synced INTEGER DEFAULT 0
  );`);
}
export function insert(rec: any) {
  const stmt = db.prepareSync("INSERT INTO records (createdAt, projectCode, room, part, symptom, note, photos, synced) VALUES (?,?,?,?,?,?,?,?)");
  stmt.executeSync([rec.createdAt, rec.projectCode, rec.room, rec.part, rec.symptom, rec.note ?? "", JSON.stringify(rec.photos), rec.synced ?? 0]);
}
export function allToday() {
  const start = new Date(); start.setHours(0,0,0,0);
  return db.getAll("SELECT * FROM records WHERE createdAt >= ? ORDER BY id DESC", [start.getTime()]);
}
export function all() {
  return db.getAll("SELECT * FROM records ORDER BY id DESC");
}
export function byId(id: number) {
  return db.getFirst("SELECT * FROM records WHERE id = ?", [id]);
}
export default db;
