import ScrollLit from '../../shared/components/scroll-lit';

// Large statement whose words light up as you scroll (aaadigital.com.au style).
export default function Statement(): JSX.Element {
  return (
    <section
      aria-label="What I do, in one sentence"
      className="statement relative overflow-hidden py-20 lg:py-28">
      <div className="statement-rings" aria-hidden="true" />
      <span
        data-parallax="-0.15"
        className="absolute left-0 bottom-6 w-2/3 sm:w-1/3 pointer-events-none"
        aria-hidden="true">
        <img
          src="/images/vectors/cylinder.svg"
          alt=""
          width={510}
          height={291}
          loading="lazy"
          className="w-full opacity-80"
        />
      </span>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollLit
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-snug tracking-tight"
          text="I help Australian businesses get *found* by improving what search engines can actually crawl and understand: crawl paths, index coverage, site structure and page *speed* — SEO with a *developer's* eye."
        />
      </div>
    </section>
  );
}
