"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
          <h2 style={{ marginBottom: "1rem" }}>Something went wrong</h2>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            The error has been reported. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.6rem 1.4rem",
              background: "#0066cc",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
