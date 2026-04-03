/**
 * Origin used in auth email links (confirm signup, magic link, etc.).
 * Prefer VITE_SITE_URL on Vercel when it must always be your production domain;
 * otherwise uses the current browser origin (correct for each deploy/preview).
 */
export function getEmailRedirectOrigin() {
  const env = import.meta.env.VITE_SITE_URL;
  if (env && String(env).trim()) {
    return String(env).trim().replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}
