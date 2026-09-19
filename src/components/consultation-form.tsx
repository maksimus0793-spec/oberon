"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/button";

type Status = "idle" | "sending" | "sent";

export function ConsultationForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    // Бэкенда пока нет: подключите сюда реальный обработчик заявок.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("sent");
    event.currentTarget.reset();
  }

  if (status === "sent") {
    return (
      <div className="rounded-[24px] bg-white p-10 text-center">
        <p className="text-2xl font-semibold text-ink">Спасибо за обращение</p>
        <p className="mt-3 text-base leading-7 text-ink-muted">
          Мы свяжемся с вами в рабочее время: Пн—Пт с 09:00 до 18:00.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Отправить ещё одну заявку
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[24px] bg-white p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ваше имя" name="name" required />
        <Field label="Телефон" name="phone" type="tel" required placeholder="+7 (___) ___-__-__" />
        <Field label="E-mail" name="email" type="email" className="sm:col-span-2" />

        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-ink">Сообщение</span>
          <textarea
            name="message"
            rows={4}
            className="w-full resize-none rounded-2xl border border-line bg-surface px-5 py-4 text-base text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-primary"
            placeholder="Коротко опишите задачу"
          />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-5 text-ink-soft">
          Нажимая кнопку, вы даёте согласие на обработку персональных данных.
        </p>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Отправляем…" : "Отправить заявку"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="h-14 w-full rounded-2xl border border-line bg-surface px-5 text-base text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-primary"
      />
    </label>
  );
}
