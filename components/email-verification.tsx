"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle, AlertCircle, Copy, Check } from "lucide-react";

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onCancel: () => void;
  type?: "verification" | "driver";
}

export function EmailVerification({
  email,
  onVerified,
  onCancel,
  type = "verification",
}: EmailVerificationProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [testingMode, setTestingMode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    sendVerificationEmail();
  }, []);

  const sendVerificationEmail = async () => {
    setIsSending(true);
    setEmailSent(false);
    setTestingMode(false);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    try {
      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, type }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`[v0] ✅ Verification email sent successfully`);
        setEmailSent(true);
      } else if (response.status === 403 && data.code) {
        console.log(
          `[v0] ⚠️ Email service in testing mode. Code: ${data.code}`,
        );
        setGeneratedOtp(data.code);
        setTestingMode(true);
        setEmailSent(false);
      } else {
        console.error("[v0] ❌ Failed to send verification email:", data);
        setError(
          data.details ||
            "Failed to send verification email. Please try again.",
        );
      }
    } catch (error) {
      console.error("[v0] ❌ Error sending email:", error);
      setError("Failed to send verification email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleVerify = () => {
    setError("");
    setIsVerifying(true);

    setTimeout(() => {
      if (otp === generatedOtp) {
        onVerified();
      } else {
        setError("Invalid verification code. Please try again.");
        setIsVerifying(false);
      }
    }, 1000);
  };

  const handleResend = () => {
    sendVerificationEmail();
    setCountdown(60);
    setCanResend(false);
    setOtp("");
    setError("");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedOtp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 overflow-x-hidden sm:space-y-6">
      <div className="text-center">
        <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-16 sm:w-16">
          <Mail className="text-primary h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <h3 className="text-foreground mb-2 text-base font-bold sm:text-lg md:text-xl lg:text-2xl">
          Verify Your Email
        </h3>
        <p className="text-muted-foreground mb-2 px-2 text-xs sm:text-sm">
          {isSending ? (
            <>Sending verification code...</>
          ) : testingMode ? (
            <>Your verification code is ready</>
          ) : (
            <>We've sent a verification code to:</>
          )}
        </p>
        {!isSending && (
          <div className="bg-primary/5 border-primary/20 mx-2 mb-2 rounded-lg border px-2 py-2 sm:px-4 sm:py-3">
            <p className="text-primary text-xs font-semibold break-all sm:text-sm md:text-base">
              {email}
            </p>
          </div>
        )}
        <p className="text-muted-foreground px-2 text-[10px] sm:text-xs">
          {testingMode
            ? "Email service is in testing mode. Use the code below to verify."
            : "Enter the 6-digit code from your email to continue."}
        </p>
      </div>

      {testingMode && generatedOtp && (
        <div className="mx-2 rounded-lg border-2 border-orange-200 bg-orange-50 p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-orange-900 sm:text-sm">
              🔧 Development Mode
            </p>
            <Button
              type="button"
              variant="ghost"
              onClick={handleCopyCode}
              className="h-6 px-2 text-xs text-orange-700 hover:bg-orange-100 hover:text-orange-900 sm:h-7"
            >
              {copied ? (
                <>
                  <Check className="mr-1 h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-3 w-3" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="mb-2 rounded border border-orange-300 bg-white px-2 py-2 sm:px-4 sm:py-3">
            <p className="text-center font-mono text-xl font-bold tracking-widest text-orange-900 sm:text-2xl md:text-3xl">
              {generatedOtp}
            </p>
          </div>
          <p className="text-[10px] text-orange-700 sm:text-xs">
            To send emails to any address, verify a domain at{" "}
            <a
              href="https://resend.com/domains"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              resend.com/domains
            </a>
          </p>
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-xs font-medium sm:text-sm">
            Verification Code
          </Label>
          <div className="flex justify-center overflow-x-hidden px-2">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                setError("");
              }}
              disabled={isSending}
            >
              <InputOTPGroup className="gap-1 sm:gap-2 md:gap-3">
                <InputOTPSlot
                  index={0}
                  className="h-9 w-9 text-base font-semibold sm:h-11 sm:w-11 sm:text-lg md:h-12 md:w-12 md:text-xl lg:h-14 lg:w-14 lg:text-2xl"
                />
                <InputOTPSlot
                  index={1}
                  className="h-9 w-9 text-base font-semibold sm:h-11 sm:w-11 sm:text-lg md:h-12 md:w-12 md:text-xl lg:h-14 lg:w-14 lg:text-2xl"
                />
                <InputOTPSlot
                  index={2}
                  className="h-9 w-9 text-base font-semibold sm:h-11 sm:w-11 sm:text-lg md:h-12 md:w-12 md:text-xl lg:h-14 lg:w-14 lg:text-2xl"
                />
                <InputOTPSlot
                  index={3}
                  className="h-9 w-9 text-base font-semibold sm:h-11 sm:w-11 sm:text-lg md:h-12 md:w-12 md:text-xl lg:h-14 lg:w-14 lg:text-2xl"
                />
                <InputOTPSlot
                  index={4}
                  className="h-9 w-9 text-base font-semibold sm:h-11 sm:w-11 sm:text-lg md:h-12 md:w-12 md:text-xl lg:h-14 lg:w-14 lg:text-2xl"
                />
                <InputOTPSlot
                  index={5}
                  className="h-9 w-9 text-base font-semibold sm:h-11 sm:w-11 sm:text-lg md:h-12 md:w-12 md:text-xl lg:h-14 lg:w-14 lg:text-2xl"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && (
            <div className="flex items-center gap-2 px-2 text-xs text-red-500 sm:text-sm">
              <AlertCircle size={14} className="shrink-0 sm:h-4 sm:w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 px-2 sm:gap-3">
          <Button
            type="button"
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying || isSending}
            className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1 text-xs font-semibold sm:text-sm md:text-base"
          >
            {isVerifying ? (
              <>
                <div className="border-accent-foreground/30 border-t-accent-foreground mr-2 h-3 w-3 animate-spin rounded-full border-2 sm:h-4 sm:w-4" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
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

        <div className="text-muted-foreground px-2 text-center text-xs sm:text-sm">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-primary font-medium hover:underline"
              disabled={isSending}
            >
              Resend Code
            </button>
          ) : (
            <span>Resend code in {countdown}s</span>
          )}
        </div>

        {emailSent && (
          <div className="bg-muted/50 text-muted-foreground mx-2 rounded-lg p-3 text-xs sm:p-4 sm:text-sm">
            <p className="text-foreground mb-1 font-medium">
              📧 Check Your Email
            </p>
            <p>
              The verification code has been sent to your email address. Please
              check your inbox (and spam folder) for an email from Delta Prime
              LLC.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
