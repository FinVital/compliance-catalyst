declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

let isInitialized = false;

/**
 * Initializes the Facebook/Meta Pixel or uses a development fallback logger.
 * @param pixelId Optional Pixel ID. If not provided, it will check import.meta.env.VITE_FB_PIXEL_ID.
 */
export function initPixel(pixelId?: string) {
  if (isInitialized) return;

  // Read the pixel ID from environment variables or custom param
  const id = pixelId || (import.meta.env.VITE_FB_PIXEL_ID as string);

  if (!id) {
    console.log("[Pixel] No Pixel ID found in environment. Running in console log debug mode.");
    isInitialized = true;
    return;
  }

  console.log(`[Pixel] Initializing Meta Pixel with ID: ${id}`);

  /* eslint-disable */
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      b.head.appendChild(t);
    }
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  if (window.fbq) {
    window.fbq('init', id);
  }
  isInitialized = true;
}

/**
 * Tracks a PageView event.
 */
export function trackPageview(url?: string) {
  if (!isInitialized) {
    initPixel();
  }

  const path = url || window.location.pathname;

  if (window.fbq) {
    window.fbq('track', 'PageView');
  }

  console.log(`[Pixel Event] PageView tracked: ${path}`);
}

/**
 * Tracks standard or custom event actions (views, clicks, conversions).
 * @param eventName Name of the event (e.g. Lead, CompleteRegistration, ClickCTA).
 * @param parameters Extra context / payload.
 */
export function trackPixelEvent(eventName: string, parameters?: Record<string, any>) {
  if (!isInitialized) {
    initPixel();
  }

  const standardEvents = [
    'ViewContent', 'Search', 'AddToCart', 'AddToWishlist', 'InitiateCheckout',
    'AddPaymentInfo', 'Purchase', 'Lead', 'CompleteRegistration', 'Contact',
    'CustomizeProduct', 'Donate', 'FindLocation', 'Schedule', 'StartTrial',
    'SubmitApplication', 'Subscribe'
  ];

  const isStandard = standardEvents.includes(eventName);

  if (window.fbq) {
    if (isStandard) {
      window.fbq('track', eventName, parameters);
    } else {
      window.fbq('trackCustom', eventName, parameters);
    }
  }

  console.log(`[Pixel Event] Event: ${eventName} (Standard: ${isStandard})`, parameters || {});
}
