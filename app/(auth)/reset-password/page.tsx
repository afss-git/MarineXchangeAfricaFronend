"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, CheckCircle2, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { AuthLeftPanel } from "@/components/auth-left-panel"
import { ApiRequestError } from "@/lib/api"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api/v1"

type PageState = "loading" | "invalid" | "form" | "success"

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (password.length === 0) return { score: 0, label: "", color: "" }
  let score = 0
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++
  if (score <= 2) return { score, label: "Weak", color: "bg-danger" }
  if (score === 3) return { score, label: "Fair", color: "bg-warning" }
  if (score === 4) return { score, label: "Good", color: "bg-ocean" }
  return { score, label: "Strong", color: "bg-success" }
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const [pageState, setPageState] = useState<PageState>("loading")
  const [accessToken, setAccessToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirm?: string; form?: string }>({})

  // Parse tokens from URL hash — set by Supabase after verifying the recovery link
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const params = new URLSearchParams(hash)
    const token = params.get("access_token")
    const type = params.get("type")

    if (token && type === "recovery") {
      setAccessToken(token)
      // Clean the hash so the token isn't visible in the URL bar
      window.history.replaceState(null, "", window.location.pathname)
      setPageState("form")
    } else {
      setPageState("invalid")
    }
  }, [])

  const strength = getPasswordStrength(password)

  function validate() {
    const e: typeof errors = {}
    if (password.length < 12) {
      e.password = "Password must be at least 12 characters."
    } else if (!/[A-Z]/.test(password)) {
      e.password = "Password must contain at least one uppercase letter."
    } else if (!/[a-z]/.test(password)) {
      e.password = "Password must contain at least one lowercase letter."
    } else if (!/\d/.test(password)) {
      e.password = "Password must contain at least one number."
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      e.password = "Password must contain at least one special character."
    }
    if (!e.password && password !== confirm) {
      e.confirm = "Passwords do not match."
    }
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setIsLoading(true)

    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken, new_password: password }),
      })

      const body = await res.json().catch(() => null)

      if (!res.ok) {
        throw new ApiRequestError(res.status, body ?? { detail: `Request failed (${res.status})` })
      }

      setPageState("success")
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.status === 400) {
          setErrors({ form: err.message || "This reset link is invalid or has expired. Please request a new one." })
        } else if (err.status === 429) {
          setErrors({ form: "Too many attempts. Please wait a moment before trying again." })
        } else {
          setErrors({ form: err.message || "Something went wrong. Please try again." })
        }
      } else {
        setErrors({ form: "Could not reach the server. Please check your connection." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AuthLeftPanel
        heading="Create a New Password"
        description="Choose a strong password to secure your Harbours360 account."
        benefits={[
          "Minimum 12 characters required",
          "Must include uppercase, number & special character",
          "Reset link is one-time use and expires in 1 hour",
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

          {/* Loading */}
          {pageState === "loading" && (
            <div className="flex flex-col items-center gap-4 py-12">
              <Spinner />
              <p className="text-text-secondary text-sm">Verifying reset link…</p>
            </div>
          )}

          {/* Invalid / expired link */}
          {pageState === "invalid" && (
            <div className="text-center space-y-5">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
                  <ShieldAlert className="w-8 h-8 text-danger" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Link invalid or expired</h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  This password reset link is invalid or has already been used. Reset links expire after 1 hour
                  and can only be used once.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <Button
                  className="w-full bg-ocean hover:bg-ocean-dark text-white h-11"
                  onClick={() => router.push("/forgot-password")}
                >
                  Request a new reset link
                </Button>
                <Link
                  href="/login"
                  className="block text-center text-sm text-text-secondary hover:text-navy transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}

          {/* Password form */}
          {pageState === "form" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-text-primary mb-2">Set new password</h2>
                <p className="text-text-secondary text-sm">
                  Choose a strong password you haven&apos;t used before.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {errors.form && (
                  <div className="p-3 rounded-lg bg-danger/10 border border-danger/20">
                    <p className="text-danger text-sm">{errors.form}</p>
                    {errors.form.toLowerCase().includes("expired") || errors.form.toLowerCase().includes("invalid") ? (
                      <Link href="/forgot-password" className="text-danger underline text-sm mt-1 inline-block">
                        Request a new link
                      </Link>
                    ) : null}
                  </div>
                )}

                {/* New password */}
                <div className="space-y-2">
                  <Label htmlFor="password">New password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 12 characters"
                      value={password}
                      onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })) }}
                      disabled={isLoading}
                      className={`pr-10 ${errors.password ? "border-danger focus-visible:ring-danger/20" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              i <= strength.score ? strength.color : "bg-border"
                            }`}
                          />
                        ))}
                      </div>
                      {strength.label && (
                        <p className={`text-xs font-medium ${
                          strength.score <= 2 ? "text-danger" :
                          strength.score === 3 ? "text-warning" :
                          strength.score === 4 ? "text-ocean" : "text-success"
                        }`}>
                          {strength.label}
                        </p>
                      )}
                    </div>
                  )}

                  {errors.password && <p className="text-danger text-sm">{errors.password}</p>}

                  <p className="text-xs text-text-secondary">
                    Must be 12+ characters with uppercase, lowercase, number, and special character.
                  </p>
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm new password</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirm}
                      onChange={e => { setConfirm(e.target.value); setErrors(prev => ({ ...prev, confirm: undefined })) }}
                      disabled={isLoading}
                      className={`pr-10 ${errors.confirm ? "border-danger focus-visible:ring-danger/20" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirm && <p className="text-danger text-sm">{errors.confirm}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || strength.score < 5}
                  className="w-full bg-ocean hover:bg-ocean-dark text-white h-11"
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Updating password…
                    </>
                  ) : (
                    "Set New Password"
                  )}
                </Button>
              </form>
            </>
          )}

          {/* Success */}
          {pageState === "success" && (
            <div className="text-center space-y-5">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Password updated</h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Your password has been changed successfully. You can now sign in with your new password.
                </p>
              </div>
              <Button
                className="w-full bg-ocean hover:bg-ocean-dark text-white h-11 mt-4"
                onClick={() => router.push("/login")}
              >
                Go to Sign In
              </Button>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
