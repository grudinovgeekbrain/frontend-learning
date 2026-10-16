"use client";

import { FormEvent, useState } from "react";

type FormStatus = { kind: "success" | "error"; message: string } | null;

export default function LeadForm() {
  const [status, setStatus] = useState<FormStatus>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setStatus(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, FormDataEntryValue | string> = Object.fromEntries(data.entries());
    const query = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      payload[key] = query.get(key) || "";
    }
    payload.landing_page = window.location.href;
    payload.referrer = document.referrer;

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку.");
      setStatus({ kind: "success", message: "Спасибо! Заявка принята. Аня или Дима скоро вам позвонят." });
      form.reset();
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Не получилось отправить заявку. Проверьте соединение и попробуйте ещё раз." });
    } finally {
      setBusy(false);
    }
  }

  return <form className="lead-form" onSubmit={submit}>
    <div className="form-topline"><span>ФОРМА № 01</span><span>ОТВЕТИМ ЛИЧНО</span></div>
    <label>Как к вам обращаться<input name="name" autoComplete="name" placeholder="Ваше имя" maxLength={100} required /></label>
    <label>Номер телефона<input name="phone" autoComplete="tel" inputMode="tel" placeholder="+375 29 123-45-67" maxLength={30} required /></label>
    <label>Что вас интересует?<select name="interest" defaultValue="subscription" required><option value="subscription">Подписка на кофе</option><option value="order">Разовый заказ</option><option value="question">Есть вопрос</option></select></label>
    <label>Комментарий <span className="optional">(необязательно)</span><textarea name="comment" placeholder="Например, люблю фильтр-кофе…" rows={3} maxLength={1000} /></label>
    <button className="button button-dark submit-button" type="submit" disabled={busy}>{busy ? "Отправляем…" : "Отправить заявку"} <span>↗</span></button>
    <p className="privacy-note">Нажимая кнопку, вы соглашаетесь на обработку данных для ответа на заявку.</p>
    {status && <p role="status" aria-live="polite" className={`form-status ${status.kind}`}>{status.message}</p>}
  </form>;
}
