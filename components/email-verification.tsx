"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { Mail, CheckCircle, AlertCircle, Copy, Check } from "lucide-react"

interface EmailVerificationProps {
  email: string
  onVerified: () => void
  onCancel: () => void
  type?: "verification" | "driver"
}

export function EmailVerification({ email, onVerified, onCancel, type = "verification" }: EmailVerificationProps) {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [testingMode, setTestingMode] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    sendVerificationEmail()
  }, [])

  const sendVerificationEmail = async () => {
    setIsSending(true)
    setEmailSent(false)
    setTestingMode(false)
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(code)

    try {
      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, type }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log(`[v0] ✅ Verification email sent successfully`)
        setEmailSent(true)
      } else if (response.status === 403 && data.code) {
        console.log(`[v0] ⚠️ Email service in testing mode. Code: ${data.code}`)
        setGeneratedOtp(data.code)
        setTestingMode(true)
        setEmailSent(false)
      } else {
        console.error("[v0] ❌ Failed to send verification email:", data)
        setError(data.details || "Failed to send verification email. Please try again.")
      }
    } catch (error) {
      console.error("[v0] ❌ Error sending email:", error)
      setError("Failed to send verification email. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleVerify = () => {
    setError("")
    setIsVerifying(true)

    setTimeout(() => {
      if (otp === generatedOtp) {
        onVerified()
      } else {
        setError("Invalid verification code. Please try again.")
        setIsVerifying(false)
      }
    }, 1000)
  }

  const handleResend = () => {
    sendVerificationEmail()
    setCountdown(60)
    setCanResend(false)
    setOtp("")
    setError("")
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedOtp)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
        </div>
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2">
          Verify Your Email
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 px-2">
          {isSending ? (
            <>Sending verification code...</>
          ) : testingMode ? (
            <>Your verification code is ready</>
          ) : (
            <>We've sent a verification code to:</>
          )}
        </p>
        {!isSending && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-2 py-2 sm:px-4 sm:py-3 mb-2 mx-2">
            <p className="text-xs sm:text-sm md:text-base font-semibold text-primary break-all">{email}</p>
          </div>
        )}
        <p className="text-[10px] sm:text-xs text-muted-foreground px-2">
          {testingMode
            ? "Email service is in testing mode. Use the code below to verify."
            : "Enter the 6-digit code from your email to continue."}
        </p>
      </div>

      {testingMode && generatedOtp && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 sm:p-4 mx-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm font-semibold text-orange-900">🔧 Development Mode</p>
            <Button
              type="button"
              variant="ghost"
              onClick={handleCopyCode}
              className="h-6 sm:h-7 px-2 text-xs text-orange-700 hover:text-orange-900 hover:bg-orange-100"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="bg-white border border-orange-300 rounded px-2 py-2 sm:px-4 sm:py-3 mb-2">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900 text-center tracking-widest font-mono">
              {generatedOtp}
            </p>
          </div>
          <p className="text-[10px] sm:text-xs text-orange-700">
            To send emails to any address, verify a domain at{" "}
            <a
              href="https://resend.com/domains"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              resend.com/domains
            </a>
          </p>
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-xs sm:text-sm font-medium">
            Verification Code
          </Label>
          <div className="flex justify-center overflow-x-hidden px-2">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value)
                setError("")
              }}
              disabled={isSending}
            >
              <InputOTPGroup className="gap-1 sm:gap-2 md:gap-3">
                <InputOTPSlot
                  index={0}
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
                />
                <InputOTPSlot
                  index={1}
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
                />
                <InputOTPSlot
                  index={2}
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
                />
                <InputOTPSlot
                  index={3}
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
                />
                <InputOTPSlot
                  index={4}
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
                />
                <InputOTPSlot
                  index={5}
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-red-500 px-2">
              <AlertCircle size={14} className="sm:w-4 sm:h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 sm:gap-3 px-2">
          <Button
            type="button"
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying || isSending}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-xs sm:text-sm md:text-base"
          >
            {isVerifying ? (
              <>
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 w-4 h-4" />
                Verify
              </>
            )}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1 bg-transparent text-xs sm:text-sm md:text-base"
            disabled={isSending}
          >
            Cancel
          </Button>
        </div>

        <div className="text-center text-xs sm:text-sm text-muted-foreground px-2">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-primary hover:underline font-medium"
              disabled={isSending}
            >
              Resend Code
            </button>
          ) : (
            <span>Resend code in {countdown}s</span>
          )}
        </div>

        {emailSent && (
          <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground mx-2">
            <p className="font-medium text-foreground mb-1">📧 Check Your Email</p>
            <p>
              The verification code has been sent to your email address. Please check your inbox (and spam folder) for
              an email from Delta Prime LLC.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
