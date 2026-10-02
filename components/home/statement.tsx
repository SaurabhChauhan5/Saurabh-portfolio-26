import ScrollLit from '../../shared/components/scroll-lit';

// Large statement whose words light up as you scroll (aaadigital.com.au style).
export default function Statement(): JSX.Element {
  return (
    <section
      aria-label="What I do, in one sentence"
      className="statement relative overflow-hidden py-24 lg:py-36"
    >
      <div className="statement-rings" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollLit
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-snug tracking-tight"
          text="I help Australian businesses get *found* by fixing what search engines actually see: crawl paths, index coverage, site structure and page *speed.* SEO, with a *developer's* eye."
        />
      </div>
    </section>
  );
}
