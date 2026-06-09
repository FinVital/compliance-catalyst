declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

let isGAInitialized = false;

/**
 * Initializes Google Analytics (GA4) or uses a development fallback logger.
 * @param measurementId Optional Measurement ID. If not provided, it will check import.meta.env.VITE_GA_MEASUREMENT_ID.
 */
export function initGA(measurementId?: string) {
  if (isGAInitialized) return;

  const id = measurementId || (import.meta.env.VITE_GA_MEASUREMENT_ID as string);

  if (!id) {
    console.log("[Google Analytics] No Measurement ID found. Running in console log debug mode.");
    isGAInitialized = true;
    return;
  }

  console.log(`[Google Analytics] Initializing GA4 with ID: ${id}`);

  // Inject Google Tag script dynamically
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", id, {
    send_page_view: false, // Handled manually in trackGAPageview to prevent duplicates in SPA
  });

  isGAInitialized = true;
}

/**
 * Tracks a PageView event in GA4.
 */
export function trackGAPageview(url?: string) {
  if (!isGAInitialized) {
    initGA();
  }

  const path = url || window.location.pathname;
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string;

  if (window.gtag && id) {
    window.gtag("event", "page_view", {
      page_path: path,
      send_to: id,
    });
  }

  console.log(`[Google Analytics Event] PageView tracked: ${path}`);
}

/**
 * Tracks a custom event in GA4.
 * @param eventName Name of the event (e.g. click_cta, submit_lead).
 * @param parameters Event properties.
 */
export function trackGAEvent(eventName: string, parameters?: Record<string, any>) {
  if (!isGAInitialized) {
    initGA();
  }

  if (window.gtag) {
    window.gtag("event", eventName, parameters);
  }

  console.log(`[Google Analytics Event] Event: ${eventName}`, parameters || {});
}
