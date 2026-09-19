import { Resend } from "resend";

import { site } from "@/content/site";

/*
 * Приём заявок с формы консультации. Письмо уходит через Resend,
 * ключ и адреса задаются переменными окружения — см. .env.example.
 */

const LIMITS = { name: 100, phone: 30, email: 150, message: 2000 } as const;

type Fields = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function findProblem(fields: Fields) {
  if (fields.name.length < 2) return "Укажите, как к вам обращаться.";
  if (fields.phone.replace(/\D/g, "").length < 10) return "Укажите телефон с кодом страны и города.";
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return "Проверьте адрес e-mail.";
  return null;
}

function fail(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      default:
        return "&quot;";
    }
  });
}

function buildBody(fields: Fields) {
  const rows: [string, string][] = [
    ["Имя", fields.name],
    ["Телефон", fields.phone],
  ];

  if (fields.email) rows.push(["E-mail", fields.email]);
  if (fields.message) rows.push(["Сообщение", fields.message]);

  return {
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: rows
      .map(
        ([label, value]) =>
          `<p style="margin:0 0 12px"><strong>${label}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
      )
      .join(""),
  };
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return fail("Не удалось прочитать заявку. Обновите страницу и попробуйте ещё раз.", 400);
  }

  const raw = (payload ?? {}) as Record<string, unknown>;

  /* Ловушка для ботов: поле скрыто от людей, поэтому заполнить его может только робот.
     Отвечаем успехом, чтобы бот не подбирал обход. */
  if (text(raw.company, 100)) {
    return Response.json({ ok: true });
  }

  const fields: Fields = {
    name: text(raw.name, LIMITS.name),
    phone: text(raw.phone, LIMITS.phone),
    email: text(raw.email, LIMITS.email),
    message: text(raw.message, LIMITS.message),
  };

  const problem = findProblem(fields);
  if (problem) return fail(problem, 400);

  const apiKey = process.env.RESEND_API_KEY;

  /* Без ключа на проде заявку терять нельзя — честно говорим, что форма недоступна.
     Локально просто пишем заявку в консоль, чтобы форму можно было проверить. */
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[zayavka] RESEND_API_KEY не задан, заявка не отправлена");
      return fail(`Форма временно недоступна. Позвоните нам: ${site.phones.office.label}.`, 503);
    }

    console.info("[zayavka] RESEND_API_KEY не задан, письмо не отправлено:", fields);
    return Response.json({ ok: true });
  }

  const body = buildBody(fields);

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.ZAYAVKA_FROM ?? `Сайт oberon.kz <zayavka@oberon.kz>`,
      to: (process.env.ZAYAVKA_TO ?? site.emails.general).split(",").map((address) => address.trim()),
      replyTo: fields.email || undefined,
      subject: `Заявка с сайта: ${fields.name}`,
      text: body.text,
      html: body.html,
    });

    if (error) {
      console.error("[zayavka] Resend вернул ошибку:", error);
      return fail(`Не получилось отправить заявку. Позвоните нам: ${site.phones.office.label}.`, 502);
    }
  } catch (cause) {
    console.error("[zayavka] Сбой при обращении к Resend:", cause);
    return fail(`Не получилось отправить заявку. Позвоните нам: ${site.phones.office.label}.`, 502);
  }

  return Response.json({ ok: true });
}
