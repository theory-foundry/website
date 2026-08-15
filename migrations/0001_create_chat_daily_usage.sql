CREATE TABLE IF NOT EXISTS chat_daily_usage (
  day TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  request_count INTEGER NOT NULL CHECK (request_count > 0),
  updated_at TEXT NOT NULL,
  PRIMARY KEY (day, ip_hash)
) WITHOUT ROWID;
