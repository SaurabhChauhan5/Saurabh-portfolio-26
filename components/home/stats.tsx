import { CountUp, Reveal } from '@shared-components';
import { STATS } from '@utils/data';

export default function Stats(): JSX.Element {
  return (
    <section aria-label="Key numbers" className="relative py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 90}
              className={`card spotlight p-5 sm:p-6 flex flex-col ${
                i === STATS.length - 1 ? 'col-span-2 lg:col-span-1' : ''
              }`}
            >
              <dt className="order-2 mt-2 text-sm sm:text-base text-white font-medium leading-snug">
                {stat.label}
              </dt>
              <dd className="order-1 text-3xl sm:text-5xl font-extrabold gradient-text leading-none">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </dd>
              {stat.note && (
                <dd className="order-3 mt-1 text-xs sm:text-sm text-violet">{stat.note}</dd>
              )}
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
