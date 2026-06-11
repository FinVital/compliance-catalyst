import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AutoTracker() {
  const location = useLocation();

  // 1. Page View Tracking
  useEffect(() => {
    const trackPageView = async () => {
      let geoIp = null;
      let geoLoc = null;

      try {
        const geoResp = await fetch("/api/geo");
        if (geoResp.ok) {
          const geoData = await geoResp.json();
          geoIp = geoData.ip || null;
          geoLoc = `${geoData.city || ""}, ${geoData.region || ""}, ${geoData.country_name || ""}`.trim().replace(/^,|,$/g, "").trim() || null;
        }
      } catch (err) {
        // Silent catch for geo fetches
      }

      try {
        await fetch("/api/visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: location.pathname + location.hash,
            ip: geoIp,
            location: geoLoc,
          }),
        });
      } catch (err) {
        // Silent catch for page visits
      }
    };

    trackPageView();
  }, [location.pathname, location.hash]);

  // 2. Global Click Tracking
  useEffect(() => {
    const handleGlobalClick = async (event: MouseEvent) => {
      try {
        const target = event.target as HTMLElement;
        if (!target || typeof target.closest !== "function") return;

        // Find closest interactive element (button, link, input submit, or clickable role)
        const interactiveEl = target.closest("button, a, input[type='submit'], [role='button']");
        if (!interactiveEl) return;

        const elementType = interactiveEl.tagName.toLowerCase();
        const elementText = (interactiveEl.textContent || "").trim().substring(0, 100);
        const elementId = interactiveEl.id || null;
        const elementClass = interactiveEl.className || null;
        const pagePath = location.pathname + location.hash;

        let geoIp = null;
        let geoLoc = null;

        try {
          const geoResp = await fetch("/api/geo");
          if (geoResp.ok) {
            const geoData = await geoResp.json();
            geoIp = geoData.ip || null;
            geoLoc = `${geoData.city || ""}, ${geoData.region || ""}, ${geoData.country_name || ""}`.trim().replace(/^,|,$/g, "").trim() || null;
          }
        } catch (err) {
          // Ignore silent fetch errors for click tracking
        }

        try {
          await fetch("/api/track-click", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pagePath,
              elementType,
              elementText,
              elementId,
              elementClass,
              ip: geoIp,
              location: geoLoc,
            }),
          });
        } catch (err) {
          // Silent catch to prevent adblockers from cluttering the console
        }
      } catch (clickErr) {
        // Silent catch for global click tracker errors
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, [location.pathname, location.hash]);

  return null;
}
