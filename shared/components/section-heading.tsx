/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import { Reveal } from './reveal';

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  index?: string;
  center?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  index,
  center = false
}: Props): JSX.Element {
  return (
    <Reveal className={`relative mb-10 md:mb-14 ${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      {index && (
        <span className="section-index" aria-hidden="true">
          {index}
        </span>
      )}
      <div className={`relative flex items-center ${center ? 'justify-center' : ''}`}>
        <span className="eyebrow-line mr-3" aria-hidden="true" />
        <p className="font-medium gradient-text text-sm md:text-base tracking-wide uppercase">
          {eyebrow}
        </p>
      </div>
      <h2
        id={id}
        className="relative mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
      >
        {title}
      </h2>
      {lead && (
        <p className="relative mt-4 text-base sm:text-lg text-violet leading-relaxed">{lead}</p>
      )}
    </Reveal>
  );
}
