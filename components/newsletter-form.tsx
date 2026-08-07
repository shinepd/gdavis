'use client';

import { useState, type FormEvent } from 'react';

import { GEORGE } from '@/lib/site';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * There is no newsletter backend, so rather than fake a success state this
 * hands off to the visitor's mail client with the signup pre-written.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }

    setError('');
    setSent(true);
    window.location.href = `mailto:${GEORGE.email}?subject=${encodeURIComponent(
      'Newsletter signup'
    )}&body=${encodeURIComponent(`Please add ${email.trim()} to your list.`)}`;
  };

  if (sent) {
    return (
      <p className="text-[14px] leading-[1.5] text-ink-2">
        Send the email we opened and we will add you to the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@studio.com"
          className="min-w-0 flex-1 rounded-sm border border-line bg-bg px-3 py-2.5 text-[13.5px] text-ink placeholder:text-ink-3"
        />
        <button
          type="submit"
          className="rounded-sm bg-ink px-4 py-2.5 text-[13.5px] font-medium text-bg transition-colors hover:bg-brand hover:text-on-brand"
        >
          Subscribe
        </button>
      </div>
      {error && <span className="text-[13px] text-brand">{error}</span>}
    </form>
  );
}
