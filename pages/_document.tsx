/* eslint-disable react/no-danger */
import { Html, Head, Main, NextScript } from 'next/document';
import { THEME_BOOT_SCRIPT } from '../shared/utils/theme';

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        {/* Enables scroll-reveal start states only when JS is running */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        {/* Theme before first paint: saved choice, otherwise Auto (time of day + device setting). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#121833" media="(prefers-color-scheme: dark)" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f8fafc" />
        <meta name="msapplication-TileColor" content="#f8fafc" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
