"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { EMAIL, FORMSPREE_URL } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const FIELDS = ["name", "company", "phone", "email", "machine", "message"] as const;
type Field = (typeof FIELDS)[number];
type Values = Record<Field, string>;

const EMPTY: Values = {
  name: "",
  company: "",
  phone: "",
  email: "",
  machine: "",
  message: "",
};

const MACHINE_OPTIONS = ["excavators", "loaders", "dozers", "trucks", "other"];

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (field: Field) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = t("errors.required");
    if (values.phone.trim().replace(/\D/g, "").length < 7)
      next.phone = t("errors.phone");
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = t("errors.email");
    if (!values.message.trim()) next.message = t("errors.required");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (FORMSPREE_URL) {
      setStatus("sending");
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        setStatus(res.ok ? "success" : "error");
        if (res.ok) setValues(EMPTY);
      } catch {
        setStatus("error");
      }
      return;
    }

    // No form backend configured yet — open the visitor's email client with
    // a prefilled message instead, so no inquiry is ever lost.
    const subject = encodeURIComponent(t("mailSubject"));
    const body = encodeURIComponent(
      FIELDS.map((f) => `${t(`fields.${f}`)}: ${values[f] || "-"}`).join("\n"),
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus("success");
  };

  const inputCls = (field: Field) =>
    `w-full border bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 ${
      errors[field] ? "border-red-500" : "border-ink-200"
    }`;

  const error = (field: Field) =>
    errors[field] ? (
      <p role="alert" className="mt-1 text-xs font-medium text-red-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t("fields.name")} *
          </label>
          <input
            id="cf-name"
            type="text"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            className={inputCls("name")}
            autoComplete="name"
          />
          {error("name")}
        </div>
        <div>
          <label htmlFor="cf-company" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t("fields.company")}
          </label>
          <input
            id="cf-company"
            type="text"
            value={values.company}
            onChange={(e) => set("company")(e.target.value)}
            className={inputCls("company")}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t("fields.phone")} *
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            className={inputCls("phone")}
            autoComplete="tel"
            placeholder="+994"
          />
          {error("phone")}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t("fields.email")}
          </label>
          <input
            id="cf-email"
            type="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            className={inputCls("email")}
            autoComplete="email"
          />
          {error("email")}
        </div>
      </div>

      <div>
        <label htmlFor="cf-machine" className="mb-1.5 block text-sm font-medium text-ink-700">
          {t("fields.machine")}
        </label>
        <select
          id="cf-machine"
          value={values.machine}
          onChange={(e) => set("machine")(e.target.value)}
          className={inputCls("machine")}
        >
          <option value="">—</option>
          {MACHINE_OPTIONS.map((opt) => (
            <option key={opt} value={t(`machineOptions.${opt}`)}>
              {t(`machineOptions.${opt}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-ink-700">
          {t("fields.message")} *
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          className={inputCls("message")}
        />
        {error("message")}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="clip-corner inline-flex items-center justify-center gap-2 bg-brand-500 px-8 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-ink-950 transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden />
        {status === "sending" ? t("sending") : t("submit")}
      </button>

      {status === "success" && (
        <p role="status" className="border-l-4 border-green-600 bg-green-50 px-4 py-3 text-sm text-green-800">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">
          {t("error")}
        </p>
      )}
      {!FORMSPREE_URL && (
        <p className="text-xs leading-relaxed text-ink-400">{t("fallbackNote")}</p>
      )}
    </form>
  );
}
