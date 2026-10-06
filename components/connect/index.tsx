import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Linkedin,
  Mail,
  MapPin,
  Phone
} from 'react-feather';
import { Button, Icon, Reveal } from '@shared-components';
import { EXPERTISE, PROFILE, RESUME_PATH } from '@utils/data';
import PageHero from '../../shared/components/page-hero';
import TopicIcon from '../../shared/components/topic-icon';
import CONTACT_FAQ from './faq';
import CopyEmail from '../../shared/components/copy-email';

const MAILTO = `mailto:${PROFILE.email}?subject=${encodeURIComponent('SEO enquiry')}`;

const ZONES = [
  { city: 'Gurugram', note: 'Where I work from', tz: 'Asia/Kolkata' },
  { city: 'Sydney', note: 'NSW clients', tz: 'Australia/Sydney' },
  { city: 'Brisbane', note: 'QLD clients', tz: 'Australia/Brisbane' }
];

const INCLUDE = [
  'Your website URL',
  'The platform it runs on (HTML, WordPress, Shopify or Wix)',
  'What you need help with: an audit, indexing, local SEO, eCommerce SEO or something else',
  'Any deadlines or launches coming up'
];

// Live local times, rendered only in the browser to avoid hydration mismatches.
function Clocks(): JSX.Element {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <ul className="grid grid-cols-3 gap-3">
      {ZONES.map((z) => (
        <li key={z.city} className="card-inner p-3 sm:p-4 text-center">
          <p className="text-lg sm:text-xl font-extrabold text-white tabular-nums whitespace-nowrap">
            {now
              ? now.toLocaleTimeString('en-AU', {
                  timeZone: z.tz,
                  hour: 'numeric',
                  minute: '2-digit'
                })
              : '--:--'}
          </p>
          <p className="mt-1 text-sm text-white font-medium">{z.city}</p>
          <p className="text-xs text-violet">{z.note}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Connect(): JSX.Element {
  const actions = [
    {
      icon: Mail,
      label: 'Email',
      value: PROFILE.email,
      href: MAILTO,
      cta: 'Send an email',
      extra: <CopyEmail />
    },
    { icon: Phone, label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref, cta: 'Call' },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'saurabhchauhaan',
      href: PROFILE.linkedin,
      cta: 'View profile',
      external: true
    },
    {
      icon: FileText,
      label: 'Resume',
      value: 'PDF, 1 page',
      href: RESUME_PATH,
      cta: 'Download',
      external: true
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s Improve Your <span className="shimmer-text">Search Performance</span>
          </>
        }
        lead="Looking for an SEO Specialist who understands both search engines and the technology behind websites? Reach out directly by email, phone or LinkedIn."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Contact' }]}
        art={
          <Image
            src="/images/vectors/contact.png"
            alt=""
            width={640}
            height={640}
            sizes="384px"
            priority
            className="w-full h-auto"
          />
        }>
        <div className="flex flex-wrap items-center gap-4">
          <Button href={MAILTO}>
            <Mail size={18} aria-hidden="true" /> Email Me
          </Button>
          <span className="inline-flex items-center gap-2 text-sm text-violet">
            <MapPin size={16} className="text-pink" aria-hidden="true" />
            {PROFILE.location} · working remotely
          </span>
        </div>
      </PageHero>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {/* Quick actions */}
        <section aria-labelledby="contact-details-title">
          <h2 id="contact-details-title" className="sr-only">
            Contact details
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map(({ icon: ActIcon, label, value, href, cta, external, extra }, i) => (
              <Reveal as="li" key={label} delay={i * 80} className="h-full">
                <div className="card spotlight hover-lift h-full p-5 flex flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span className="icon-tile">
                      <ActIcon size={20} aria-hidden="true" />
                    </span>
                    {extra}
                  </div>
                  <p className="mt-4 text-xs text-violet uppercase tracking-wider">{label}</p>
                  <p className="mt-1 text-white font-medium break-all">{value}</p>
                  <a
                    href={href}
                    className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm text-pink font-medium hover:underline"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {cta}
                    <span aria-hidden="true">→</span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <Reveal as="section" className="card spotlight p-6 sm:p-7" aria-labelledby="tz-title">
              <h2 id="tz-title" className="flex items-center gap-2 text-lg font-bold text-white">
                <Clock size={18} className="text-pink" aria-hidden="true" />
                Time zones
              </h2>
              <p className="mt-1 text-sm text-violet">
                I work from India with Australian businesses, so our working days overlap.
              </p>
              <div className="mt-5">
                <Clocks />
              </div>
            </Reveal>

            <Reveal
              as="section"
              delay={80}
              className="card spotlight p-6 sm:p-7"
              aria-labelledby="include-title">
              <h2 id="include-title" className="text-lg font-bold text-white">
                What to include in your message
              </h2>
              <ul className="mt-4 space-y-3">
                {INCLUDE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-violet">
                    <CheckCircle
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-pink"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal
            as="section"
            variant="right"
            className="lg:col-span-7 card card-glow spotlight p-6 sm:p-8"
            aria-labelledby="help-title">
            <h2 id="help-title" className="text-lg font-bold text-white">
              How I can help
            </h2>
            <ul className="mt-5 grid sm:grid-cols-2 gap-5">
              {EXPERTISE.map((group) => (
                <li key={group.title} className="flex items-start gap-3">
                  <span className="icon-tile icon-tile-sm">
                    <Icon name={group.icon} size={18} />
                  </span>
                  <span>
                    <span className="block text-white font-semibold">{group.title}</span>
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {group.items.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 text-xs text-violet">
                          <TopicIcon label={item} size={12} />
                          {item}
                        </span>
                      ))}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-violet/20 flex flex-wrap items-center gap-4">
              <Button href={MAILTO}>
                <Mail size={18} aria-hidden="true" /> Email Me
              </Button>
              <Button href={PROFILE.linkedin} type="outlined" external>
                <Linkedin size={18} aria-hidden="true" /> LinkedIn
              </Button>
              <p className="text-sm text-violet">Email is the quickest way to reach me.</p>
            </div>
          </Reveal>
        </div>

        <section aria-labelledby="faq-title">
          <Reveal>
            <h2 id="faq-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              Frequently asked <span className="text-pink">questions</span>
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-3">
            {CONTACT_FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="faq card spotlight group">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer text-white font-semibold">
                    {f.q}
                    <ChevronDown
                      size={18}
                      className="faq-chevron flex-shrink-0 text-pink"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-5 pb-5 -mt-1 text-violet leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
