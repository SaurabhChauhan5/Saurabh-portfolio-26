import { useState } from 'react';
import { Check, Copy } from 'react-feather';
import { PROFILE } from '@utils/data';

const MAILTO = `mailto:${PROFILE.email}`;

// Copies the email address, falling back to opening the mail client.
export default function CopyEmail(): JSX.Element {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = MAILTO;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="copy-btn"
      aria-label={copied ? 'Email address copied' : 'Copy email address'}>
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
