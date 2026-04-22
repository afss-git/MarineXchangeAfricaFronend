"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { AuthLeftPanel } from "@/components/auth-left-panel"
import { ApiRequestError } from "@/lib/api"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api/v1"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      // The endpoint always returns 200 — read body to confirm success
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        const detail = body?.detail
        throw new ApiRequestError(res.status, body ?? { detail: `Request failed (${res.status})` })
      }

      setSent(true)
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.status === 429) {
          setError("Too many requests. Please wait a few minutes before trying again.")
        } else {
          setError(err.message || "Something went wrong. Please try again.")
        }
      } else {
        setError("Could not reach the server. Please check your connection and try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AuthLeftPanel
        heading="Reset Your Password"
        description="Enter your email and we'll send you a secure, one-time reset link valid for 1 hour."
        benefits={[
          "Secure, time-limited reset link",
          "No password exposed in email",
          "One-time use — link invalidates after use",
        ]}
      />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-white">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
            <Image src="/logo-icon.png" alt="Harbours360" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-navy">Harbours</span>
            <span className="text-ocean">360</span>
          </span>
        </div>

        <div className="w-full max-w-105">
          {sent ? (
            /* ── Success state ─────────────────────────────────── */
            <div className="text-center space-y-5">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Check your inbox</h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  If <span className="font-medium text-text-primary">{email}</span> is registered,
                  you will receive a password reset link within a few minutes.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-ocean/5 border border-ocean/15 text-left space-y-1.5">
                <p className="text-xs font-semibold text-text-primary">Didn&apos;t get the email?</p>
                <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
                  <li>Check your spam or junk folder</li>
                  <li>Make sure you entered the correct email</li>
                  <li>The link expires in 1 hour — request a new one if needed</li>
                </ul>
              </div>
              <div className="pt-2 space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-10 text-sm"
                  onClick={() => { setSent(false); setEmail("") }}
                >
                  Try a different email
                </Button>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-1.5 text-sm text-text-secondary hover:text-navy transition-colors w-full"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* ── Request form ──────────────────────────────────── */
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-text-primary mb-2">Forgot your password?</h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Enter your registered email and we&apos;ll send you a secure reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 rounded-lg bg-danger/10 border border-danger/20">
                    <p className="text-danger text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Registered email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError("") }}
                    autoComplete="email"
                    disabled={isLoading}
                    className={error ? "border-danger focus-visible:ring-danger/20" : ""}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-ocean hover:bg-ocean-dark text-white h-11 gap-2"
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Send Reset Link
                    </>
                  )}
                </Button>

                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-navy transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
