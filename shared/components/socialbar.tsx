import { SOCIAL_LINKS } from '@utils/data';

// Fixed side rail, only on wide screens where it can't overlap content.
export default function SocialBar(): JSX.Element {
  return (
    <aside className="hidden xl:block fixed left-5 bottom-0 z-30" aria-label="Social links">
      <ul className="flex flex-col items-center">
        {SOCIAL_LINKS.map((item) => {
          const external = item.href.startsWith('http');
          return (
            <li key={item.label}>
              <a
                href={item.href}
                aria-label={item.label}
                className="block p-1.5 my-1 transition-all hover:opacity-60 transform hover:-translate-y-0.5"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <img src={item.icon} alt="" width={28} height={28} className="w-7 h-7" />
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mx-auto h-24 mt-2 w-px bg-violet" aria-hidden="true" />
    </aside>
  );
}
