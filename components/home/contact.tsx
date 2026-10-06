import { Linkedin, Mail, MapPin, Phone, FileText } from 'react-feather';
import { Button, Reveal } from '@shared-components';
import { PROFILE, RESUME_PATH } from '@utils/data';

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
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="scale" className="card spotlight contact-card p-8 sm:p-12 text-center">
          <div className="flex items-center justify-center">
            <span className="w-12 mr-3 h-px bg-violet" aria-hidden="true" />
            <p className="font-light gradient-text text-sm md:text-base">Get in touch</p>
            <span className="w-12 ml-3 h-px bg-violet" aria-hidden="true" />
          </div>
          <h2
            id="contact-title"
            className="mt-4 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Let&apos;s Improve Your <span className="gradient-text">Search Performance</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-violet max-w-2xl mx-auto leading-relaxed">
            Looking for an SEO Specialist who understands both search engines and the technology
            behind websites? Let&apos;s connect.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={`mailto:${PROFILE.email}`}>
              <Mail size={18} aria-hidden="true" /> Email Me
            </Button>
            <Button href={PROFILE.linkedin} type="outlined" external>
              <Linkedin size={18} aria-hidden="true" /> LinkedIn
            </Button>
            <Button href={RESUME_PATH} type="ghost" download>
              <FileText size={18} aria-hidden="true" /> View Resume
            </Button>
          </div>
          <address className="not-italic mt-10 grid sm:grid-cols-3 gap-4 text-sm">
            <a href={`mailto:${PROFILE.email}`} className="contact-item">
              <Mail size={18} aria-hidden="true" />
              <span className="break-words">{PROFILE.email}</span>
            </a>
            <a href={PROFILE.phoneHref} className="contact-item">
              <Phone size={18} aria-hidden="true" />
              <span>{PROFILE.phone}</span>
            </a>
            <span className="contact-item">
              <MapPin size={18} aria-hidden="true" />
              <span>{PROFILE.location}</span>
            </span>
          </address>
        </Reveal>
      </div>
    </section>
  );
}
