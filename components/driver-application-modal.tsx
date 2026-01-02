"use client";

import * as React from "react";
import { useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CheckCircle,
  ExternalLink,
  CalendarIcon,
  TruckIcon
} from "lucide-react";
import { CustomPhoneInput } from "@/components/custom/custom-phone-input";
import {
  validateEmail,
  validateSingleWordName,
  validateCDL,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* =========================================================
 * Types
 * =======================================================*/
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string; // kept for future use if needed
  cdl: string;
  experience: string; // years (string for controlled input)
  position: string; // radio
  startDate: string; // "YYYY-MM-DD"
  hearAbout: string; // select
  message: string; // optional
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  cdl?: string;
  experience?: string;
  position?: string;
  startDate?: string;
  hearAbout?: string;
}

/* =========================================================
 * Component
 * =======================================================*/
export function DriverApplicationModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    cdl: "",
    experience: "",
    position: "",
    startDate: "",
    hearAbout: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    countryCode: false,
    cdl: false,
    experience: false,
    position: false,
    startDate: false,
    hearAbout: false,
    message: false,
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [barNudge, setBarNudge] = useState<"warn" | "ok" | null>(null);

  /* =========================================================
   * Validation
   * =======================================================*/
  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "firstName": {
        if (!value) return "First name is required";
        if (value.length > 50) return "Name must be 50 characters or less";
        if (!/^[a-zA-Z'-]{2,50}$/.test(value)) {
          return "Use a single word (letters, hyphen, apostrophe)";
        }
        const res = validateSingleWordName(value);
        return res.valid ? "" : res.message;
      }
      case "lastName": {
        if (!value) return "Last name is required";
        if (value.length > 50) return "Name must be 50 characters or less";
        const res = validateSingleWordName(value);
        return res.valid ? "" : res.message;
      }
      case "email": {
        if (!value) return "Email is required";
        if (value.length > 100) return "Email must be 100 characters or less";
        const res = validateEmail(value);
        return res.valid ? "" : res.message;
      }
      case "phone": {
        if (!value) return "Phone number is required";
        const digits = value.replace(/\D/g, "");
        if (digits.length < 8) return "Please enter a valid phone number";
        return "";
      }
      case "cdl": {
        if (!value) return "CDL number is required";
        const res = validateCDL(value);
        return res.valid ? "" : res.message;
      }
      case "experience": {
        if (!value) return "Years of experience is required";
        const years = Number.parseInt(value);
        if (Number.isNaN(years) || years < 0) return "Enter a valid number";
        if (years > 10) return "Please enter a realistic number (max 10)";
        return "";
      }
      case "position": {
        if (!value) return "Please select a position";
        return "";
      }
      case "startDate": {
        if (!value) return "Please select a preferred start date";
        const selected = new Date(value + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) return "Start date cannot be in the past";
        return "";
      }
      case "hearAbout": {
        if (!value) return "Please tell us how you heard about us";
        return "";
      }
      default:
        return "";
    }
  };

  const REQUIRED_FIELDS: (keyof FormData)[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "cdl",
    "experience",
    "position",
    "startDate",
    "hearAbout",
  ];

  const fieldIsValid = (key: keyof FormData): boolean =>
    validateField(key, formData[key]) === "";

  const validCount = useMemo(
    () => REQUIRED_FIELDS.filter(fieldIsValid).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData], // email verification affects final 100% state
  );

  const handleFieldChange = (name: keyof FormData, value: string) => {
    // soft guards
    if ((name === "firstName" || name === "lastName") && value.length > 50)
      return;
    if (name === "email" && value.length > 100) return;

    // name normalization
    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[0-9]/g, "").replace(/\s/g, "");
    }

    // numbers-only for experience
    if (name === "experience") {
      value = value.replace(/\D/g, "").slice(0, 2);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCDLChange = (value: string) => {
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const letters = cleaned.match(/^[A-Z]{0,2}/)?.[0] || "";
    const numbers = cleaned
      .slice(letters.length)
      .replace(/\D/g, "")
      .slice(0, 8);
    const formatted = letters + numbers;
    handleFieldChange("cdl", formatted);
  };

  /* =========================================================
   * Submit / Email Verify
   * =======================================================*/
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let ok = true;
    for (const key of REQUIRED_FIELDS) {
      const err = validateField(key, formData[key]);
      if (err) {
        newErrors[key as keyof FormErrors] = err;
        ok = false;
      }
    }
    setErrors(newErrors);
    return ok;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    console.log(formData);
    if (!validateForm()) {
      // pulse the bar to hint “finish fields”
      setBarNudge("warn");
      setTimeout(() => setBarNudge(null), 500);
      // mark all required as touched to reveal errors
      const allTouched = { ...touched };
      REQUIRED_FIELDS.forEach((k) => (allTouched[k] = true));
      setTouched(allTouched);
      return;
    }

    // All good
    console.log("[v0] Driver application submitted:", formData);
    setIsSubmitted(true);
    setTimeout(resetAll, 1800);
  };

  const resetAll = () => {
    setOpen(false);
    setIsSubmitted(false);
    setAttemptedSubmit(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      countryCode: "+1",
      cdl: "",
      experience: "",
      position: "",
      startDate: "",
      hearAbout: "",
      message: "",
    });
    setErrors({});
    setTouched({
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      countryCode: false,
      cdl: false,
      experience: false,
      position: false,
      startDate: false,
      hearAbout: false,
      message: false,
    });
  };

  const handleEmailVerified = async () => {
    try {
      console.log("[v0] 📧 Sending driver application email...");
      const response = await fetch("/api/send-driver-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("[v0] ✅ Driver application sent successfully!");
        setIsSubmitted(true);
        setTimeout(resetAll, 1800);
      } else {
        console.error("[v0] ❌ Failed to send driver application:", data);
        alert("Failed to send application. Please try again.");
      }
    } catch (error) {
      console.error("[v0] ❌ Error sending driver application:", error);
      alert("Failed to send application. Please try again.");
    }
  };

  /* =========================================================
   * Helpers
   * =======================================================*/
  const formatDateToDDMMYYYY = (date: string): string => {
    if (!date) return "";
    // date is "YYYY-MM-DD" — create local date safely:
    const [y, m, d] = date.split("-").map((n) => parseInt(n, 10));
    const dateObj = new Date(y, m - 1, d);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  /* =========================================================
   * UI
   * =======================================================*/
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
        >
          <TruckIcon className="mr-1 w-3 h-3" />
          Driver Application
        </Button>
      </DialogTrigger>
      <div data-radix-portal="true">
        <DialogContent className="modal-overlay modal-scroll max-h-[85vh] max-w-2xl overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-lg font-bold sm:text-xl md:text-2xl">
              Driver Application
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-base">
              Join the Delta Prime team. Fill out the form below to get started.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="bg-accent mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <CheckCircle className="text-accent-foreground" size={32} />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-bold sm:text-xl md:text-2xl">
                Application Submitted!
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                Our recruitment team will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-2 space-y-6">
              {/* ================= Personal ================= */}
              <section className="space-y-4">
                <h3 className="text-foreground text-sm font-semibold sm:text-base md:text-lg">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* First Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-xs sm:text-sm">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleFieldChange("firstName", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("firstName")}
                      onKeyDown={(e) => {
                        if (/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey)
                          e.preventDefault();
                      }}
                      className={cn(
                        "text-sm capitalize sm:text-base",
                        (touched.firstName || attemptedSubmit) &&
                        errors.firstName &&
                        "border-red-500",
                      )}
                      maxLength={50}
                      placeholder="John"
                      required
                    />
                    {(touched.firstName || attemptedSubmit) &&
                      errors.firstName && (
                        <p className="text-xs text-red-500">
                          {errors.firstName}
                        </p>
                      )}
                    <p className="text-muted-foreground text-[10px] sm:text-xs">
                      Single word only (e.g., John, Mary-Jane)
                    </p>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-xs sm:text-sm">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleFieldChange("lastName", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("lastName")}
                      onKeyDown={(e) => {
                        if (/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey)
                          e.preventDefault();
                      }}
                      className={cn(
                        "text-sm capitalize sm:text-base",
                        (touched.lastName || attemptedSubmit) &&
                        errors.lastName &&
                        "border-red-500",
                      )}
                      maxLength={50}
                      placeholder="Smith"
                      required
                    />
                    {(touched.lastName || attemptedSubmit) &&
                      errors.lastName && (
                        <p className="text-xs text-red-500">
                          {errors.lastName}
                        </p>
                      )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs sm:text-sm">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("email")}
                      className={cn(
                        "text-sm sm:text-base",
                        (touched.email || attemptedSubmit) &&
                        errors.email &&
                        "border-red-500",
                      )}
                      placeholder="example@email.com"
                      maxLength={100}
                      required
                    />
                    {(touched.email || attemptedSubmit) && errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <CustomPhoneInput
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(phone) => handleFieldChange("phone", phone)}
                      error={(touched.phone || attemptedSubmit) && errors.phone}
                      required
                      defaultCountry="us"
                    />
                    {(touched.phone || attemptedSubmit) && errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* ================= CDL & Experience ================= */}
              <section className="space-y-4">
                <h3 className="text-foreground text-sm font-semibold sm:text-base md:text-lg">
                  CDL & Experience
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* CDL */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="cdl"
                      className="flex items-center justify-between text-xs sm:text-sm"
                    >
                      <span>
                        CDL License Number{" "}
                        <span className="text-red-500">*</span>
                      </span>
                      <Link
                        href="https://tpr.fmcsa.dot.gov/check"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary flex items-center gap-1 text-[10px] hover:underline sm:text-xs"
                      >
                        <span className="hidden sm:inline">Verify CDL</span>
                        <ExternalLink size={12} />
                      </Link>
                    </Label>
                    <Input
                      id="cdl"
                      value={formData.cdl}
                      onChange={(e) => handleCDLChange(e.target.value)}
                      onBlur={() => handleFieldBlur("cdl")}
                      className={cn(
                        "text-sm sm:text-base",
                        (touched.cdl || attemptedSubmit) &&
                        errors.cdl &&
                        "border-red-500",
                      )}
                      placeholder="A1234567"
                      maxLength={10}
                      required
                    />
                    {(touched.cdl || attemptedSubmit) && errors.cdl && (
                      <p className="text-xs text-red-500">{errors.cdl}</p>
                    )}
                    <p className="text-muted-foreground text-[10px] sm:text-xs">
                      Format: Letter(s) followed by 6–8 digits
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-1.5">
                    <Label htmlFor="experience" className="text-xs sm:text-sm">
                      Years of Experience{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="experience"
                      inputMode="numeric"
                      value={formData.experience}
                      onChange={(e) =>
                        handleFieldChange("experience", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("experience")}
                      className={cn(
                        "text-sm sm:text-base",
                        (touched.experience || attemptedSubmit) &&
                        errors.experience &&
                        "border-red-500",
                      )}
                      placeholder="5"
                      maxLength={2}
                      required
                    />
                    {(touched.experience || attemptedSubmit) &&
                      errors.experience && (
                        <p className="text-xs text-red-500">
                          {errors.experience}
                        </p>
                      )}
                    <p className="text-muted-foreground text-[10px] sm:text-xs">
                      Maximum 10 years
                    </p>
                  </div>
                </div>
              </section>

              {/* ================= Position & Availability ================= */}
              <section className="space-y-4">
                <h3 className="text-foreground text-sm font-semibold sm:text-base md:text-lg">
                  Position & Availability
                </h3>

                {/* Position (Radio) */}
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm">
                    What positions are you interested in?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.position}
                    onValueChange={(value) => {
                      handleFieldChange("position", value);
                      if (touched.position) handleFieldBlur("position");
                    }}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="company-driver"
                        id="company-driver"
                      />
                      <Label
                        htmlFor="company-driver"
                        className="cursor-pointer text-xs font-normal sm:text-sm"
                      >
                        Company Driver
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lease-to-own" id="lease-to-own" />
                      <Label
                        htmlFor="lease-to-own"
                        className="cursor-pointer text-xs font-normal sm:text-sm"
                      >
                        Lease to Own
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="owner-operator"
                        id="owner-operator"
                      />
                      <Label
                        htmlFor="owner-operator"
                        className="cursor-pointer text-xs font-normal sm:text-sm"
                      >
                        Owner Operator
                      </Label>
                    </div>
                  </RadioGroup>
                  {(touched.position || attemptedSubmit) && errors.position && (
                    <p className="text-xs text-red-500">{errors.position}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Start Date */}
                  <div className="space-y-1.5">
                    <Label htmlFor="startDate" className="text-xs sm:text-sm">
                      Preferred Start Date{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left text-xs font-normal sm:text-sm",
                            !formData.startDate && "text-muted-foreground",
                            (touched.startDate || attemptedSubmit) &&
                            errors.startDate &&
                            "border-red-500",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                          <span className="truncate">
                            {formData.startDate
                              ? formatDateToDDMMYYYY(formData.startDate)
                              : "Pick a date"}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="z-9999 w-auto p-0"
                        align="start"
                        sideOffset={4}
                      >
                        <Calendar
                          mode="single"
                          selected={
                            formData.startDate
                              ? new Date(formData.startDate + "T00:00:00")
                              : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              // local-safe YYYY-MM-DD
                              const localDate = `${date.getFullYear()}-${String(
                                date.getMonth() + 1,
                              ).padStart(2, "0")}-${String(
                                date.getDate(),
                              ).padStart(2, "0")}`;
                              handleFieldChange("startDate", localDate);
                              if (touched.startDate)
                                handleFieldBlur("startDate");
                            }
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {(touched.startDate || attemptedSubmit) &&
                      errors.startDate && (
                        <p className="text-xs text-red-500">
                          {errors.startDate}
                        </p>
                      )}
                  </div>

                  {/* Hear About */}
                  <div className="space-y-1.5">
                    <Label htmlFor="hearAbout" className="text-xs sm:text-sm">
                      How did you hear about us?{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.hearAbout}
                      onValueChange={(value) => {
                        handleFieldChange("hearAbout", value);
                        if (touched.hearAbout) handleFieldBlur("hearAbout");
                      }}
                    >
                      <SelectTrigger
                        id="hearAbout"
                        className={cn(
                          "text-xs sm:text-sm",
                          (touched.hearAbout || attemptedSubmit) &&
                          errors.hearAbout &&
                          "border-red-500",
                        )}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-of-our-drivers">
                          One of our drivers
                        </SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="job-board">Job Board</SelectItem>
                        <SelectItem value="google-search">
                          Google Search
                        </SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {(touched.hearAbout || attemptedSubmit) &&
                      errors.hearAbout && (
                        <p className="text-xs text-red-500">
                          {errors.hearAbout}
                        </p>
                      )}
                  </div>
                </div>
              </section>

              {/* ================= Additional ================= */}
              <section className="space-y-2">
                <Label htmlFor="message" className="text-xs sm:text-sm">
                  Additional Information
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleFieldChange("message", e.target.value)}
                  className="modal-scroll text-sm sm:text-base"
                  placeholder="Tell us about your experience, certs, and why you want to join Delta Prime..."
                  maxLength={1000}
                />
                <p className="text-muted-foreground text-right text-[10px] sm:text-xs">
                  {formData.message.length}/1000 characters
                </p>
              </section>

              <Button
                type="submit"
                className={cn(
                  "bg-accent hover:bg-accent/90 text-accent-foreground w-full text-sm font-semibold sm:text-base",
                )}
                onClick={() => { }}
              >
                Submit Application
              </Button>
            </form>
          )}
        </DialogContent>
      </div>
    </Dialog>
  );
}
