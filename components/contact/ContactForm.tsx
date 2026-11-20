"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Send } from "lucide-react";
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

const MACHINE_OPTIONS = ["excavators", "loaders", "dozers", "other"];

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

  const labelCls = "mb-2 block text-sm font-medium text-fg";

  const inputCls = (field: Field) =>
    `w-full rounded-md border bg-bg px-4 py-3 text-[0.9375rem] text-fg outline-none transition-colors placeholder:text-dim focus:border-brand ${
      errors[field] ? "border-red-500" : "border-line-strong"
    }`;

  const describedBy = (field: Field) =>
    errors[field] ? `cf-${field}-error` : undefined;

  const error = (field: Field) =>
    errors[field] ? (
      <p id={`cf-${field}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-400">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            {t("fields.name")} <span className="text-brand">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            className={inputCls("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
          />
          {error("name")}
        </div>
        <div>
          <label htmlFor="cf-company" className={labelCls}>
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
          <label htmlFor="cf-phone" className={labelCls}>
            {t("fields.phone")} <span className="text-brand">*</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            className={inputCls("phone")}
            autoComplete="tel"
            placeholder="+994"
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
          />
          {error("phone")}
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            {t("fields.email")}
          </label>
          <input
            id="cf-email"
            type="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            className={inputCls("email")}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
          />
          {error("email")}
        </div>
      </div>

      <div>
        <label htmlFor="cf-machine" className={labelCls}>
          {t("fields.machine")}
        </label>
        <div className="relative">
          <select
            id="cf-machine"
            value={values.machine}
            onChange={(e) => set("machine")(e.target.value)}
            className={`${inputCls("machine")} appearance-none pr-11`}
          >
            <option value="">—</option>
            {MACHINE_OPTIONS.map((opt) => (
              <option key={opt} value={t(`machineOptions.${opt}`)}>
                {t(`machineOptions.${opt}`)}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dim"
            aria-hidden
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>
          {t("fields.message")} <span className="text-brand">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          className={inputCls("message")}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
        />
        {error("message")}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand px-7 text-[0.9375rem] font-semibold text-bg transition-colors hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden />
        {status === "sending" ? t("sending") : t("submit")}
      </button>

      {status === "success" && (
        <p role="status" className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {t("error")}
        </p>
      )}
      {!FORMSPREE_URL && (
        <p className="text-xs leading-relaxed text-dim">{t("fallbackNote")}</p>
      )}
    </form>
  );
}
