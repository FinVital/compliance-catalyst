import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export default function SEO({ title, description, canonicalPath, schema }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement("meta");
      descMeta.setAttribute("name", "description");
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute("content", description);

    // 3. Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    // 4. Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description);
    }

    // 5. Open Graph URL
    const currentUrl = `https://www.regulattice.com${canonicalPath || location.pathname}`;
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", currentUrl);
    }

    // 6. Canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);

    // 7. Schema Injection
    let schemaScript = document.getElementById("dynamic-jsonld-schema");
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement("script");
      schemaScript.id = "dynamic-jsonld-schema";
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.innerHTML = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Clean up dynamic schema script on unmount
      const existingScript = document.getElementById("dynamic-jsonld-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonicalPath, location.pathname, schema]);

  return null;
}
