import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Poppins } from 'next/font/google';
import '../styles/global.css';
import { Footer, Navbar, SocialBar } from '@shared-components';
import CookieAlert from '../shared/components/cookie-alert';
import usePageEffects from '../shared/utils/use-page-effects';

// Self-hosted by next/font: no render-blocking request to Google Fonts.
const poppins = Poppins({
  subsets: ['latin'],
  // Three weights keep font preloads small; 300/500 fall back to 400, 700 to 800.
  weight: ['400', '600', '800'],
  display: 'swap',
  variable: '--font-poppins'
});

const GA_ID = 'G-2595CLJE11';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  usePageEffects();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <style jsx global>{`
        :root {
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
      <div className={`${poppins.variable} font-poppins min-h-screen overflow-x-clip`}>
        <Navbar />
        <SocialBar />
        <main id="main" tabIndex={-1} className="outline-none">
          <Component {...pageProps} />
        </main>
        <Footer />
        <CookieAlert />
      </div>

      {/* Analytics loads after the page is idle so it never competes with rendering */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}

export default MyApp;
