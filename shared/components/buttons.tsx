/* eslint-disable react/require-default-props */
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
  type?: 'solid' | 'outlined' | 'ghost';
  external?: boolean;
  download?: boolean;
  className?: string;
  ariaLabel?: string;
}

const styles = {
  solid: 'btn-solid bg-pink text-blue border-pink shadow-sm',
  outlined: 'bg-transparent text-pink border-pink hover:bg-pink hover:text-blue',
  ghost: 'bg-transparent text-violet border-violet/40 hover:border-violet hover:text-white'
};

// Real links (not buttons with window.open) so they are crawlable, keyboard
// accessible and support open-in-new-tab.
export default function Button({
  href,
  children,
  type = 'solid',
  external = false,
  download = false,
  className = '',
  ariaLabel
}: Props): JSX.Element {
  const classes = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border-2 font-medium text-base
    transition-colors duration-200 ${styles[type]} ${className}`;

  if (external || download || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { target: '_blank', rel: 'noopener' } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
