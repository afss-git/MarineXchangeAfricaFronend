import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
  process.env.BACKEND_URL ||
  "http://localhost:8000"

// FIND-005: security headers for the Vercel-served web app. The FastAPI backend
// already sets strong headers on API responses, but the Next.js HTML pages — the
// surface where users/admins actually browse — had none, leaving clickjacking
// and (combined with token storage) XSS exposure unmitigated.
//
// CSP NOTE: this starting policy is intentionally Next.js-compatible — it keeps
// 'unsafe-inline'/'unsafe-eval' (Next's runtime needs them without nonce wiring)
// and allows https: for img/connect (Supabase storage images, the API, Sentry)
// so it cannot white-screen the app. It still adds frame-ancestors 'none',
// object-src 'none', base-uri/form-action 'self'. FOLLOW-UP (QA-gated): move to a
// nonce-based strict-dynamic script-src and an explicit connect-src/img-src
// allowlist, validated visually against the running app.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ")

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), autoplay=(), camera=(), display-capture=(), " +
      "encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), " +
      "magnetometer=(), microphone=(), midi=(), payment=(), usb=()",
  },
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${BACKEND_URL}/api/v1/:path*`,
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  // Your Sentry org slug — found in Sentry → Settings → Organization
  org: "dan-baqi-technologies",

  // The project name you created for the frontend in Sentry
  project: "javascript-nextjs",

  // Upload source maps to Sentry so stack traces show real line numbers.
  // Requires SENTRY_AUTH_TOKEN env var (get from Sentry → Settings → Auth Tokens).
  silent: !process.env.CI,

  // Wider file upload — catches dynamic-import chunks too
  widenClientFileUpload: true,

  // Strip source maps from the deployed bundle (they live in Sentry, not public)
  hideSourceMaps: true,

  // Tree-shake Sentry logger statements out of the production bundle
  disableLogger: true,
});
