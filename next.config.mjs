import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
  process.env.BACKEND_URL ||
  "http://localhost:8000"

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
  project: "harbours360-frontend",

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
