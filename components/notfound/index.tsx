import { Button } from '@shared-components';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="relative overflow-hidden min-h-[80vh] flex items-center">
      <img
        src="/images/vectors/404-polygon.svg"
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 w-1/2 sm:w-1/3 pointer-events-none opacity-70"
      />
      <img
        src="/images/vectors/404-hero.svg"
        alt=""
        aria-hidden="true"
        width={1094}
        height={953}
        className="not-found-art absolute right-0 top-40 w-5/12 hidden lg:block pointer-events-none"
      />
      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <p className="text-violet text-lg">Hey! You seem to be lost.</p>
        <h1 className="mt-2 font-extrabold text-5xl sm:text-7xl text-white leading-none">
          404. <span className="gradient-text">Not Found.</span>
        </h1>
        <p className="mt-5 text-violet max-w-lg">
          This page isn&apos;t indexed here — it may have moved. Try one of these instead:
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/case-studies" type="outlined">
            SEO Case Studies
          </Button>
          <Button href="/projects" type="ghost">
            Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
