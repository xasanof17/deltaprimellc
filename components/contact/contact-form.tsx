"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import {
  validateEmail,
  validateFirstName,
  validateName,
} from "@/lib/validation";
import { CustomPhoneInput } from "@/components/custom/custom-phone-input";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "firstName":
        const firstNameValidation = validateFirstName(value);
        return firstNameValidation.valid ? "" : firstNameValidation.message;
      case "lastName":
        const nameValidation = validateName(value);
        return nameValidation.valid ? "" : nameValidation.message;
      case "email":
        const emailValidation = validateEmail(value);
        return emailValidation.valid ? "" : emailValidation.message;
      case "phone":
        if (!value) return ""; // Phone is optional
        return "";
      case "subject":
        if (!value) return "Subject is required";
        if (value.length < 3) return "Subject must be at least 3 characters";
        return "";
      case "message":
        if (!value) return "Message is required";
        if (value.length < 10) return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleFieldChange = (name: keyof FormData, value: string) => {
    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[0-9]/g, "");
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "email",
      "subject",
      "message",
    ];
    requiredFields.forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const allTouched = Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {},
      );
      setTouched(allTouched);
      return;
    }

    console.log("[v0] Contact form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
      setErrors({});
      setTouched({});
    }, 3000);
  };
  return (
    <div className="lg:col-span-2">
      <Card className="border-2">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <h2 className="text-foreground mb-4 text-xl font-bold sm:mb-6 sm:text-2xl md:text-3xl">
            Send Us a Message
          </h2>
          {isSubmitted ? (
            <div className="py-12 text-center">
              <div className="bg-accent mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <CheckCircle className="text-accent-foreground" size={32} />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-bold sm:text-xl md:text-2xl">
                Message Sent!
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
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
                      if (/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                      }
                    }}
                    className={`text-sm capitalize sm:text-base ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                    placeholder="John"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  )}
                  <p className="text-muted-foreground text-[10px] sm:text-xs">
                    Single word only (e.g., John, Mary-Jane)
                  </p>
                </div>
                <div className="space-y-2">
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
                      if (/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                      }
                    }}
                    className={`text-sm capitalize sm:text-base ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                    placeholder="Smith"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    className={`text-sm sm:text-base ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="example@company.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs sm:text-sm">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <CustomPhoneInput
                    value={formData.phone}
                    onChange={(value) => handleFieldChange("phone", value)}
                    onBlur={() => handleFieldBlur("phone")}
                    error={errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-xs sm:text-sm">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleFieldChange("company", e.target.value)}
                  onBlur={() => handleFieldBlur("company")}
                  className={`text-sm capitalize sm:text-base ${
                    errors.company ? "border-red-500" : ""
                  }`}
                  placeholder="Your Company Inc."
                  required
                />
                {errors.company && (
                  <p className="text-xs text-red-500">{errors.company}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs sm:text-sm">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleFieldChange("subject", e.target.value)}
                  onBlur={() => handleFieldBlur("subject")}
                  className={`text-sm capitalize sm:text-base ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                  placeholder="How can we help you?"
                  required
                />
                {errors.subject && (
                  <p className="text-xs text-red-500">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs sm:text-sm">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleFieldChange("message", e.target.value)}
                  onBlur={() => handleFieldBlur("message")}
                  className={`text-sm sm:text-base ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  required
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="text-xs text-red-500">{errors.message}</p>
                )}
                <p className="text-muted-foreground text-[10px] sm:text-xs">
                  {formData.message.length} characters (minimum 10 required)
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-full text-sm font-semibold sm:text-base"
              >
                Send Message
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
