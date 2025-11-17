"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Package, ArrowRight } from "lucide-react";
import {
  validateEmail,
  validateSingleWordName,
  companyNameRegex,
} from "@/lib/validation";
import { AddressInput } from "@/components/custom/address-input";
import { CustomPhoneInput } from "@/components/custom/custom-phone-input";
import { EmailVerification } from "@/components/email-verification";
import { RouteMap } from "@/components/animations/route-map";

interface Coordinates {
  lat: number;
  lng: number;
}

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  cargoDetails: string;
  originCoords?: Coordinates;
  destinationCoords?: Coordinates;
}

interface FormErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  origin?: string;
  destination?: string;
  cargoDetails?: string;
}

export function ShipperQuoteModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingQuote, setIsSendingQuote] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "+1", // Initialize with default country code
    origin: "",
    destination: "",
    cargoDetails: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  /* ---------------- Field Validation ---------------- */
  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "companyName":
        if (!value) return "Company name is required";
        if (!companyNameRegex.test(value)) return "Invalid company name format";
        return "";
      case "contactName":
        const nameValidation = validateSingleWordName(value);
        return nameValidation.valid ? "" : nameValidation.message;
      case "email":
        const emailValidation = validateEmail(value);
        return emailValidation.valid ? "" : emailValidation.message;
      case "phone":
        if (!value) return "Phone number is required";
        // Remove the + and any non-digit characters for validation
        const cleaned = value.replace(/\D/g, "");
        // Must have country code + at least 7 digits
        if (cleaned.length < 8) return "Phone number is too short";
        if (cleaned.length > 15) return "Phone number is too long";
        return "";
      case "origin":
      case "destination":
        if (!value) return "Location is required";
        return "";
      case "cargoDetails":
        if (!value) return "Cargo details are required";
        if (value.length < 10)
          return "Please provide more details (at least 10 characters)";
        return "";
      default:
        return "";
    }
  };

  /* ---------------- Field Handlers ---------------- */
  const handleFieldChange = (name: keyof FormData, value: string) => {
    if (name === "contactName") value = value.replace(/[0-9]/g, "");
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const value = formData[name];
    if (typeof value === "string") {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  /* ---------------- Form Validation ---------------- */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (typeof value === "string") {
        const error = validateField(key as keyof FormData, value);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!validateForm()) {
      const allTouched = Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {},
      );
      setTouched(allTouched);
      return;
    }

    if (!isEmailVerified) {
      setShowVerification(true);
      return;
    }

    console.log("[v0] Quote form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(resetForm, 2000);
  };

  const resetForm = () => {
    setOpen(false);
    setIsSubmitted(false);
    setShowVerification(false);
    setIsEmailVerified(false);
    setAttemptedSubmit(false);
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "+1", // Reset to default country code
      origin: "",
      destination: "",
      cargoDetails: "",
    });
    setErrors({});
    setTouched({});
  };

  const handleEmailVerified = async () => {
    setIsEmailVerified(true);
    setShowVerification(false);
    setIsSendingQuote(true);

    try {
      console.log("[v0] 📧 Sending quote data via email...");
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("[v0] ✅ Quote sent successfully!");
        setIsSubmitted(true);
        setTimeout(resetForm, 2000);
      } else {
        console.error("[v0] ❌ Failed to send quote:", data);
        alert("Failed to send quote. Please try again.");
      }
    } catch (error) {
      console.error("[v0] ❌ Error sending quote:", error);
      alert("Failed to send quote. Please try again.");
    } finally {
      setIsSendingQuote(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full font-semibold sm:w-auto">
          Get a Quote <ArrowRight className="ml-2" size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="modal-scroll max-h-[90vh] max-w-3xl overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold sm:text-xl md:text-2xl">
            Request a Shipping Quote
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm md:text-base">
            Tell us about your shipping needs and we'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        {showVerification ? (
          <EmailVerification
            email={formData.email}
            onVerified={handleEmailVerified}
            onCancel={() => setShowVerification(false)}
            type="verification"
          />
        ) : isSendingQuote ? (
          <div className="py-8 text-center">
            <div className="bg-accent mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <div className="border-accent-foreground/30 border-t-accent-foreground h-8 w-8 animate-spin rounded-full border-4" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-bold sm:text-xl md:text-2xl">
              Sending Your Quote Request...
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
              Please wait while we process your request.
            </p>
          </div>
        ) : isSubmitted ? (
          <div className="py-8 text-center">
            <div className="bg-accent mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Package className="text-accent-foreground" size={32} />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-bold sm:text-xl md:text-2xl">
              Quote Request Submitted!
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
              We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-5">
            {/* Company + Contact */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-xs sm:text-sm">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleFieldChange("companyName", e.target.value)
                  }
                  onBlur={() => handleFieldBlur("companyName")}
                  placeholder="Your Company Inc."
                  className={
                    touched.companyName && errors.companyName
                      ? "border-red-500"
                      : ""
                  }
                  required
                />
                {(touched.companyName || attemptedSubmit) &&
                  errors.companyName && (
                    <p className="text-xs text-red-500">{errors.companyName}</p>
                  )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-xs sm:text-sm">
                  Contact Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) =>
                    handleFieldChange("contactName", e.target.value)
                  }
                  onBlur={() => handleFieldBlur("contactName")}
                  placeholder="John"
                  className={
                    touched.contactName && errors.contactName
                      ? "border-red-500"
                      : ""
                  }
                  required
                />
                {(touched.contactName || attemptedSubmit) &&
                  errors.contactName && (
                    <p className="text-xs text-red-500">{errors.contactName}</p>
                  )}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  onBlur={() => handleFieldBlur("email")}
                  placeholder="example@company.com"
                  className={
                    touched.email && errors.email ? "border-red-500" : ""
                  }
                  required
                />
                {(touched.email || attemptedSubmit) && errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <CustomPhoneInput
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(phone) => handleFieldChange("phone", phone)}
                  error={(touched.phone || attemptedSubmit) && errors.phone}
                  required
                  defaultCountry="us"
                />
              </div>
            </div>

            {/* Locations */}
            <AddressInput
              id="origin"
              label="Origin Location"
              value={formData.origin}
              onChange={(value, coords) => {
                handleFieldChange("origin", value);
                if (coords)
                  setFormData((prev) => ({ ...prev, originCoords: coords }));
              }}
              required
              error={
                (touched.origin || attemptedSubmit) && errors.origin
                  ? errors.origin
                  : undefined
              }
            />

            <AddressInput
              id="destination"
              label="Destination Location"
              value={formData.destination}
              onChange={(value, coords) => {
                handleFieldChange("destination", value);
                if (coords)
                  setFormData((prev) => ({
                    ...prev,
                    destinationCoords: coords,
                  }));
              }}
              required
              error={
                (touched.destination || attemptedSubmit) && errors.destination
                  ? errors.destination
                  : undefined
              }
            />

            {/* Route Visualization */}
            {formData.originCoords && formData.destinationCoords && (
              <div className="space-y-2">
                <Label>Route Visualization</Label>
                <RouteMap
                  origin={formData.originCoords}
                  destination={formData.destinationCoords}
                  originLabel={formData.origin}
                  destinationLabel={formData.destination}
                />
              </div>
            )}

            {/* Cargo */}
            <div className="space-y-2">
              <Label htmlFor="cargoDetails" className="text-xs sm:text-sm">
                Cargo Details <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="cargoDetails"
                rows={4}
                value={formData.cargoDetails}
                onChange={(e) =>
                  handleFieldChange("cargoDetails", e.target.value)
                }
                onBlur={() => handleFieldBlur("cargoDetails")}
                placeholder="Describe your cargo (type, weight, dimensions, special requirements...)"
                className={
                  (touched.cargoDetails || attemptedSubmit) &&
                  errors.cargoDetails
                    ? "border-red-500"
                    : ""
                }
                required
              />
              {(touched.cargoDetails || attemptedSubmit) &&
                errors.cargoDetails && (
                  <p className="text-xs text-red-500">{errors.cargoDetails}</p>
                )}
            </div>

            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-full font-semibold"
            >
              Continue to Verification
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
