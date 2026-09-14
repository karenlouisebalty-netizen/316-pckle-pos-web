-- ── STAFF DAILY RATE (for payroll) ──────────────────
-- Flat amount paid per day worked, set per staff member by the owner (editable from the
-- Attendance > Manage Staff tab). /attendance/summary uses this to auto-compute salary
-- for any day with a completed clock-in + clock-out.
--
-- Unlike Pickle Farm's copy of this migration, no default rates are seeded here — 316
-- PCKLE's staff and their pay rates weren't known at the time this was ported. Everyone
-- starts at ₱0/day until the owner sets a real rate from Manage Staff.
ALTER TABLE users ADD COLUMN daily_rate REAL NOT NULL DEFAULT 0;
