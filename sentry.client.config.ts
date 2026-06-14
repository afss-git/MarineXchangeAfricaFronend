import * as Sentry from "@sentry/nextjs";

// Temporary diagnostic — remove after confirming Sentry is working
console.log("[Sentry] DSN status:", process.env.NEXT_PUBLIC_SENTRY_DSN ? "✅ loaded" : "❌ MISSING — check Vercel env vars");

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Capture 20% of transactions for performance monitoring
  tracesSampleRate: 0.2,

  // Replay: record every session that contains an error, 5% of normal sessions
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.05,

  integrations: [
    Sentry.replayIntegration({
      // Mask all text and block all media by default — no PII recorded
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Never send passwords, tokens, or cookie values
  sendDefaultPii: false,
});
