-- Migration 0003 — leads table (R6-4 Sovereign AgentShield intake).
-- Additive only; does NOT touch the MoR engine tables (sub_brands, invoices,
-- callbacks, fanout_log). Stores audit-intake leads (no payment/Duitku involved).
--
-- Truth-Lock note: R6-4 spec assumed a `leads` table already existed in
-- migration 0002 — it did NOT (0002 = replay_protection). This migration
-- creates it for real so the /security-audit intake can persist.

CREATE TABLE IF NOT EXISTS leads (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  source        TEXT NOT NULL DEFAULT 'security-audit', -- which funnel produced the lead
  name          TEXT NOT NULL,
  contact       TEXT NOT NULL,                           -- email or phone/WA
  company       TEXT,
  surfaces      TEXT,                                    -- comma-joined agent surfaces (WA/email/PDF/MCP/...)
  message       TEXT,
  status        TEXT NOT NULL DEFAULT 'new',             -- new | contacted | qualified | closed
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
