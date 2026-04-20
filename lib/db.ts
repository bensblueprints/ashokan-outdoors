import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const dir = process.env.DATA_DIR || '/app/data'
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

export const db = new Database(path.join(dir, 'leads.db'))

db.exec(`CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  preferred_date TEXT,
  group_size TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)
