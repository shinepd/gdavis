'use client';

import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
};

const NEEDS = ['Samples', 'Specs & details', 'Budget pricing', 'Lunch-and-learn'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'rounded-sm border border-line bg-bg px-[13px] py-3 text-[14.5px] font-normal text-ink placeholder:text-ink-3';

export function ContactForm() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [needs, setNeeds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  const update = (field: keyof FormData, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: '' }));
  };

  const toggleNeed = (need: string) =>
    setNeeds((previous) =>
      previous.includes(need)
        ? previous.filter((item) => item !== need)
        : [...previous, need]
    );

  const validate = () => {
    const next: Partial<FormData> = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!EMAIL_PATTERN.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.message.trim()) next.message = 'Tell us what you need.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_KEY!);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_company: form.company,
          from_email: form.email,
          from_phone: form.phone,
          // The selected chips ride along with the message body.
          message: needs.length
            ? `${form.message}\n\nLooking for: ${needs.join(', ')}`
            : form.message,
          to_name: 'G. Davis & Associates',
        }
      );

      setForm(EMPTY_FORM);
      setNeeds([]);
      setStatus('sent');
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-start justify-center gap-4 bg-surface p-8 md:p-11">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand">
          Message sent
        </span>
        <h3 className="max-w-[22ch] text-[26px] leading-[1.1] tracking-[-0.025em]">
          Thanks - we&apos;ll come back to you shortly.
        </h3>
        <p className="max-w-[40ch] text-[15px] leading-[1.55] text-ink-2">
          Samples and details usually follow within the week. If it&apos;s
          urgent, call the rep for your scope directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="link-more"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface p-8 md:p-11">
      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          required
          error={errors.name}
          input={
            <input
              type="text"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              placeholder="Jane Doe"
              className={inputClass}
            />
          }
        />
        <Field
          label="Company"
          input={
            <input
              type="text"
              value={form.company}
              onChange={(event) => update('company', event.target.value)}
              placeholder="Studio or firm"
              className={inputClass}
            />
          }
        />
        <Field
          label="Email"
          required
          error={errors.email}
          input={
            <input
              type="email"
              value={form.email}
              onChange={(event) => update('email', event.target.value)}
              placeholder="you@studio.com"
              className={inputClass}
            />
          }
        />
        <Field
          label="Phone"
          input={
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => update('phone', event.target.value)}
              placeholder="(000) 000-0000"
              className={inputClass}
            />
          }
        />
        <Field
          label="What do you need?"
          required
          error={errors.message}
          className="sm:col-span-2"
          input={
            <textarea
              rows={5}
              value={form.message}
              onChange={(event) => update('message', event.target.value)}
              placeholder="Project, product category, and what you're trying to solve."
              className={cn(inputClass, 'resize-y')}
            />
          }
        />

        <div className="flex flex-wrap gap-2 sm:col-span-2">
          {NEEDS.map((need) => {
            const selected = needs.includes(need);
            return (
              <button
                key={need}
                type="button"
                onClick={() => toggleNeed(need)}
                aria-pressed={selected}
                className={cn(
                  'rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors',
                  selected
                    ? 'border-brand bg-brand-soft text-brand'
                    : 'border-line text-ink-2 hover:border-ink-3 hover:text-ink'
                )}
              >
                {need}
              </button>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-1 rounded-full bg-brand px-[22px] py-3.5 text-[15px] font-semibold text-on-brand transition-[filter] hover:brightness-110 disabled:opacity-60 sm:col-span-2"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'error' && (
          <p className="text-[13.5px] text-brand sm:col-span-2">
            Something went wrong sending that. Please try again, or email us
            directly.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  required = false,
  error,
  input,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('flex flex-col gap-[7px] text-[13px] font-medium', className)}>
      {label} {required && '*'}
      {input}
      {error && <span className="text-[12.5px] font-normal text-brand">{error}</span>}
    </label>
  );
}
