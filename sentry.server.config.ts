import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Capture 20% of transactions for performance monitoring
  tracesSampleRate: 0.2,

  // Never send passwords, tokens, or cookie values
  sendDefaultPii: false,
});
