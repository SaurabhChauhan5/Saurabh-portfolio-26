import { ArrowUpRight, Briefcase, FileText, Linkedin, Mail, MapPin, Phone } from 'react-feather';
import { Button, Reveal } from '@shared-components';
import { ACTIVE_WEBSITES, PROFILE, RESUME_PATH } from '@utils/data';
import CopyEmail from '../../shared/components/copy-email';
import TopicIcon from '../../shared/components/topic-icon';

const MAILTO = `mailto:${PROFILE.email}?subject=${encodeURIComponent('SEO enquiry')}`;

export default function Contact(): JSX.Element {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section relative overflow-hidden">
      <img
        src="/images/vectors/ellipse.svg"
        alt=""
        aria-hidden="true"
        width={500}
        height={500}
        loading="lazy"
        className="absolute -left-20 -bottom-20 w-2/3 md:w-1/3 opacity-50 pointer-events-none"
      />
      <span
        data-parallax="0.1"
        className="absolute right-0 top-10 w-1/3 md:w-1/5 pointer-events-none"
        aria-hidden="true">
        <img
          src="/images/vectors/heart.svg"
          alt=""
          width={663}
          height={840}
          loading="lazy"
          className="w-full opacity-80"
        />
      </span>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="scale" className="cta-card">
          <div className="cta-card-inner grid lg:grid-cols-12 gap-10 lg:gap-12 items-center p-5 sm:p-10 lg:p-14">
            <div className="lg:col-span-7 min-w-0">
              <p className="availability">
                <span className="pulse-dot" aria-hidden="true" />
                Get in touch
              </p>
              <h2
                id="contact-title"
                className="mt-5 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Let&apos;s Improve Your <span className="gradient-text">Search Performance</span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-violet max-w-xl leading-relaxed">
                Looking for an SEO Specialist who understands both search engines and the technology
                behind websites? Let&apos;s connect.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={MAILTO}>
                  <Mail size={18} aria-hidden="true" /> Email Me
                </Button>
                <Button href={PROFILE.linkedin} type="outlined" external>
                  <Linkedin size={18} aria-hidden="true" /> LinkedIn
                </Button>
                <Button href={RESUME_PATH} type="ghost" download>
                  <FileText size={18} aria-hidden="true" /> View Resume
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="text-xs font-semibold tracking-widest text-violet uppercase">
                  Platforms
                </span>
                {['HTML', 'WordPress', 'Shopify', 'Wix'].map((p) => (
                  <span key={p} className="hero-platform">
                    <TopicIcon label={p} size={18} />
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <address className="lg:col-span-5 min-w-0 not-italic space-y-3">
              <div className="cta-row">
                <span className="icon-tile icon-tile-sm">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs text-violet">Email</span>
                  <a
                    href={MAILTO}
                    className="block py-0.5 text-white font-medium truncate hover:text-pink transition-colors">
                    {PROFILE.email}
                  </a>
                </span>
                <CopyEmail />
              </div>
              <a href={PROFILE.phoneHref} className="cta-row group">
                <span className="icon-tile icon-tile-sm">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block text-xs text-violet">Phone</span>
                  <span className="block text-white font-medium group-hover:text-pink transition-colors">
                    {PROFILE.phone}
                  </span>
                </span>
                <ArrowUpRight size={16} className="text-violet" aria-hidden="true" />
              </a>
              <div className="cta-row">
                <span className="icon-tile icon-tile-sm">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block text-xs text-violet">Based in</span>
                  <span className="block text-white font-medium">{PROFILE.location}</span>
                </span>
              </div>
              <div className="cta-row">
                <span className="icon-tile icon-tile-sm">
                  <Briefcase size={18} aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block text-xs text-violet">Working with</span>
                  <span className="block text-white font-medium">
                    {ACTIVE_WEBSITES} active Australian business websites
                  </span>
                </span>
              </div>
            </address>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
