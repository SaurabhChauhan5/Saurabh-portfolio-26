import { Linkedin, Mail, MapPin, Phone, FileText } from 'react-feather';
import { Button, Icon } from '@shared-components';
import { EXPERTISE, PROFILE, RESUME_PATH } from '@utils/data';
import PageHero from '../../shared/components/page-hero';

const ITEMS = [
  { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/saurabhchauhaan',
    href: PROFILE.linkedin,
    external: true
  },
  {
    icon: FileText,
    label: 'Resume',
    value: 'View / download PDF',
    href: RESUME_PATH,
    external: true
  },
  { icon: MapPin, label: 'Location', value: PROFILE.location }
];

export default function Connect(): JSX.Element {
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
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold text-white">Contact details</h2>
            <ul className="mt-4 space-y-3">
              {ITEMS.map(({ icon: IconCmp, label, value, href, external }) => {
                const content = (
                  <>
                    <span className="icon-tile icon-tile-sm">
                      <IconCmp size={18} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-violet">{label}</span>
                      <span className="block text-white font-medium break-words">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="card spotlight p-4 flex items-center gap-4 hover-lift"
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {content}
                      </a>
                    ) : (
                      <div className="card spotlight p-4 flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold text-white">How I can help</h2>
            <div className="mt-4 card card-glow spotlight p-6 sm:p-8">
              <ul className="grid sm:grid-cols-2 gap-4">
                {EXPERTISE.map((group) => (
                  <li key={group.title} className="flex items-start gap-3">
                    <span className="icon-tile icon-tile-sm">
                      <Icon name={group.icon} size={18} />
                    </span>
                    <span>
                      <span className="block text-white font-semibold">{group.title}</span>
                      <span className="block text-sm text-violet">
                        {group.items.slice(0, 3).join(', ')}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-violet leading-relaxed">
                I work across HTML, WordPress, Shopify and Wix websites. Email is the quickest way
                to reach me.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href={`mailto:${PROFILE.email}`}>
                  <Mail size={18} aria-hidden="true" /> Email Me
                </Button>
                <Button href={PROFILE.linkedin} type="outlined" external>
                  <Linkedin size={18} aria-hidden="true" /> LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
