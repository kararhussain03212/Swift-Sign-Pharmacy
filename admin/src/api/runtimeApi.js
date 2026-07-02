const trimSlash = (value) => String(value || "").replace(/\/+$/, "");

function getOrigin() {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

export function getBackendRoot() {
  // Explicit override wins (used for image/upload URL resolution)
  const backendRoot = trimSlash(import.meta.env.VITE_BACKEND_ROOT || "");
  if (backendRoot) return backendRoot;

  const envApiBase = trimSlash(import.meta.env.VITE_API_URL);
  // If it's an absolute URL, strip /api suffix
  if (envApiBase && /^https?:\/\//i.test(envApiBase)) {
    return envApiBase.replace(/\/api$/i, "");
  }
  // Relative/proxy mode — fall back to hard-coded local backend for image URLs
  if (import.meta.env.DEV) return "http://localhost/Pharmacy/backend";

  const origin = getOrigin();
  if (!origin) return "/backend";
  return `${origin}/backend`;
}

export function getApiBase() {
  const envApiBase = trimSlash(import.meta.env.VITE_API_URL);
  if (envApiBase) return envApiBase;
  return `${getBackendRoot()}/api`;
}
