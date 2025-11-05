"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import {
  validateEmail,
  validateFirstName,
  validateName,
} from "@/lib/validation";
import { CustomPhoneInput } from "@/components/custom-phone-input";

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

export default function ContactPage() {
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
        {}
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
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-balance">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Have questions? Need a quote? Our team is here to help you find the
            perfect logistics solution
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="border-2 hover:border-primary transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                    <MapPin className="text-primary-foreground" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    Headquarters
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    1101 31st
                    <br />
                    Downers Grove, IL 60515
                    <br />
                    United States
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                    <Phone className="text-accent-foreground" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    Phone
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Main: +1 (708) 907-2006
                    <br />
                    Sales: +1 (708) 907-2006
                    <br />
                    Support: +1 (708) 907-2006
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                    <Mail className="text-primary-foreground" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    Email
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    General: applications@deltaprime.com
                    <br />
                    Sales: sales@deltaprime.com
                    <br />
                    Support: support@deltaprime.com
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                    <Clock className="text-accent-foreground" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    Business Hours
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Monday - Friday: 8:00 AM - 6:00 PM CST
                    <br />
                    Saturday: 9:00 AM - 2:00 PM CST
                    <br />
                    24/7 Emergency Support Available
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                    Send Us a Message
                  </h2>
                  {isSubmitted ? (
                    <div className="py-12 text-center">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle
                          className="text-accent-foreground"
                          size={32}
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                        We'll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-xs sm:text-sm"
                          >
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
                              if (
                                /[0-9]/.test(e.key) &&
                                !e.ctrlKey &&
                                !e.metaKey
                              ) {
                                e.preventDefault();
                              }
                            }}
                            className={`text-sm sm:text-base capitalize ${
                              errors.firstName ? "border-red-500" : ""
                            }`}
                            placeholder="John"
                            required
                          />
                          {errors.firstName && (
                            <p className="text-xs text-red-500">
                              {errors.firstName}
                            </p>
                          )}
                          <p className="text-[10px] sm:text-xs text-muted-foreground">
                            Single word only (e.g., John, Mary-Jane)
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-xs sm:text-sm"
                          >
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
                              if (
                                /[0-9]/.test(e.key) &&
                                !e.ctrlKey &&
                                !e.metaKey
                              ) {
                                e.preventDefault();
                              }
                            }}
                            className={`text-sm sm:text-base capitalize ${
                              errors.lastName ? "border-red-500" : ""
                            }`}
                            placeholder="Smith"
                            required
                          />
                          {errors.lastName && (
                            <p className="text-xs text-red-500">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
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
                            className={`text-sm sm:text-base ${
                              errors.email ? "border-red-500" : ""
                            }`}
                            placeholder="example@company.com"
                            required
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-xs sm:text-sm">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <CustomPhoneInput
                            value={formData.phone}
                            onChange={(value) =>
                              handleFieldChange("phone", value)
                            }
                            onBlur={() => handleFieldBlur("phone")}
                            error={errors.phone}
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500">
                              {errors.phone}
                            </p>
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
                          onChange={(e) =>
                            handleFieldChange("company", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("company")}
                          className={`text-sm sm:text-base capitalize ${
                            errors.company ? "border-red-500" : ""
                          }`}
                          placeholder="Your Company Inc."
                          required
                        />
                        {errors.company && (
                          <p className="text-xs text-red-500">
                            {errors.company}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-xs sm:text-sm">
                          Subject <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            handleFieldChange("subject", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("subject")}
                          className={`text-sm sm:text-base capitalize ${
                            errors.subject ? "border-red-500" : ""
                          }`}
                          placeholder="How can we help you?"
                          required
                        />
                        {errors.subject && (
                          <p className="text-xs text-red-500">
                            {errors.subject}
                          </p>
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
                          onChange={(e) =>
                            handleFieldChange("message", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("message")}
                          className={`text-sm sm:text-base ${
                            errors.message ? "border-red-500" : ""
                          }`}
                          required
                          placeholder="Tell us how we can help you..."
                        />
                        {errors.message && (
                          <p className="text-xs text-red-500">
                            {errors.message}
                          </p>
                        )}
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {formData.message.length} characters (minimum 10
                          required)
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm sm:text-base"
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Locations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              With offices and facilities across North America and beyond
            </p>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img
              src="/world-map-with-logistics-network-connections-and-p.jpg"
              alt="Global locations map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Need Immediate Assistance?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Our 24/7 support team is always ready to help with urgent logistics
            needs
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm sm:text-base md:text-lg px-8 py-6"
          >
            <Phone className="mr-2" size={20} />
            Call Now: 1-800-555-DELTA
          </Button>
        </div>
      </section>
    </main>
  );
}
