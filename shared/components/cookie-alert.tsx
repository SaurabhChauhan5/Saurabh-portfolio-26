import { useEffect, useState } from 'react';

interface CookiePreferences {
  acceptedCookies: boolean;
  askAgainDate: number | null;
}

export default function CookieAlert(): JSX.Element {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleCookiesAlert = (accepted: boolean): void => {
    setShowAlert(false);
    const cookiePreferencesObj: CookiePreferences = {
      acceptedCookies: accepted,
      askAgainDate: accepted
        ? null // user accepted cookies, no need to ask again
        : new Date().getTime() + 1000 * 60 * 60 * 24 * 5 // current time + 5 days
    };
    try {
      localStorage.setItem('cookieObject', JSON.stringify(cookiePreferencesObj));
    } catch {
      // storage unavailable (private mode) — just hide for this visit
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    try {
      const cookieObjJson = localStorage.getItem('cookieObject');
      const prefs: CookiePreferences | null = cookieObjJson ? JSON.parse(cookieObjJson) : null;
      if (!prefs || (!prefs.acceptedCookies && new Date().getTime() > prefs.askAgainDate)) {
        timer = setTimeout(() => setShowAlert(true), 1500);
      }
    } catch {
      // ignore
    }
    return () => clearTimeout(timer);
  }, []);

  if (!showAlert) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="cookie-alert fixed bottom-0 sm:bottom-5 right-0 sm:right-5 z-50 w-full sm:max-w-sm px-4 py-2.5 sm:p-4 bg-pink text-blue sm:rounded-lg shadow-2xl cookie-row flex flex-wrap items-center gap-x-3 gap-y-1"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}>
      <p className="flex-1 min-w-[12rem] text-xs sm:text-sm leading-snug sm:py-2">
        <span className="font-semibold">Cookies: </span>
        This site uses analytics cookies to understand how visitors use it.
      </p>
      <div className="flex items-center gap-2 sm:w-full sm:justify-between sm:mt-2 ml-auto">
        <button
          type="button"
          className="px-2 py-2 text-sm hover:underline"
          onClick={() => handleCookiesAlert(false)}>
          Dismiss
        </button>
        <button
          className="px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base bg-blue text-pink border-2 border-blue rounded hover:bg-transparent hover:text-blue transition-colors"
          type="button"
          onClick={() => handleCookiesAlert(true)}>
          Accept
        </button>
      </div>
    </div>
  );
}
