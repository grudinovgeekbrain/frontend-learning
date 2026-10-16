import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: unknown; phone?: unknown; interest?: unknown; comment?: unknown;
  utm_source?: unknown; utm_medium?: unknown; utm_campaign?: unknown;
  utm_content?: unknown; utm_term?: unknown; landing_page?: unknown; referrer?: unknown;
};

function normalizeBelarusPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  // Accept +375XXXXXXXXX, 375XXXXXXXXX, or local 80XXXXXXXXX.
  let normalized = digits;
  if (normalized.startsWith("80") && normalized.length === 11) normalized = "375" + normalized.slice(2);
  if (normalized.startsWith("375") && normalized.length === 12 && /^375(25|29|33|44)\d{7}$/.test(normalized)) return "+" + normalized;
  return null;
}

function database() {
  const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new Database(path.join(dataDir, "leads.sqlite"));
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      interest TEXT NOT NULL,
      comment TEXT NOT NULL DEFAULT '',
      utm_source TEXT, utm_medium TEXT, utm_campaign TEXT,
      utm_content TEXT, utm_term TEXT,
      landing_page TEXT, referrer TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_leads_phone_created ON leads(phone, created_at);
  `);
  return db;
}

export async function POST(request: NextRequest) {
  let body: LeadPayload;
  try { body = await request.json() as LeadPayload; }
  catch { return NextResponse.json({ error: "Не удалось прочитать форму. Обновите страницу и попробуйте ещё раз." }, { status: 400 }); }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
  const interest = typeof body.interest === "string" ? body.interest : "";
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";

  if (name.length < 2 || name.length > 100) return NextResponse.json({ error: "Укажите имя длиной от 2 до 100 символов." }, { status: 400 });
  const phone = normalizeBelarusPhone(rawPhone);
  if (!phone) return NextResponse.json({ error: "Введите белорусский номер: +375 29 123-45-67." }, { status: 400 });
  if (!["subscription", "order", "question"].includes(interest)) return NextResponse.json({ error: "Выберите, что вас интересует." }, { status: 400 });
  if (comment.length > 1000) return NextResponse.json({ error: "Комментарий не должен превышать 1000 символов." }, { status: 400 });

  try {
    const db = database();
    const clean = (value: unknown, max = 300) => typeof value === "string" ? value.trim().slice(0, max) : null;
    const insert = db.prepare(`INSERT INTO leads
      (name, phone, interest, comment, utm_source, utm_medium, utm_campaign, utm_content, utm_term, landing_page, referrer)
      VALUES (@name, @phone, @interest, @comment, @utm_source, @utm_medium, @utm_campaign, @utm_content, @utm_term, @landing_page, @referrer)`);
    const saveLead = db.transaction(() => {
      const recent = db.prepare("SELECT id FROM leads WHERE phone = ? AND created_at >= datetime('now', '-10 minutes') LIMIT 1").get(phone) as { id: number } | undefined;
      if (recent) return null;
      return insert.run({
        name, phone, interest, comment,
        utm_source: clean(body.utm_source), utm_medium: clean(body.utm_medium),
        utm_campaign: clean(body.utm_campaign), utm_content: clean(body.utm_content),
        utm_term: clean(body.utm_term), landing_page: clean(body.landing_page, 1000),
        referrer: clean(body.referrer, 1000)
      });
    });
    const result = saveLead();
    db.close();
    if (!result) return NextResponse.json({ error: "Мы уже получили заявку с этого номера. Если нужно что-то уточнить, дождитесь звонка или попробуйте позже." }, { status: 409 });
    return NextResponse.json({ ok: true, id: result.lastInsertRowid }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Сейчас не удалось сохранить заявку. Попробуйте ещё раз чуть позже." }, { status: 500 });
  }
}
