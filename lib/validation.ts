// validation.ts — central validators + country metadata
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

// ========= REGEX PRIMITIVES (exported for reuse) =========
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;

export const companyNameRegex = /^[a-zA-Z0-9\s&.,'-]{2,100}$/;

export const zipCodeRegex = /^\d{4,10}$/;

export const coordinateRegex =
  /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

export const weightRegex = /^\d+(\.\d{1,2})?\s?(lbs?|kg|tons?)?$/i;

export const dimensionRegex =
  /^\d+(\.\d{1,2})?\s?x\s?\d+(\.\d{1,2})?\s?x\s?\d+(\.\d{1,2})?\s?(in|ft|cm|m)?$/i;

// ========= HELPERS =========
export function isRealisticName(name: string): boolean {
  const clean = name.replace(/[\s'-]/g, "").toLowerCase();
  if (clean.length < 2) return false;
  if (/(.)\1{2,}/.test(clean)) return false; // no “aaa”
  if (!/[aeiou]/i.test(clean)) return false; // looks like a real word
  return true;
}

// ========= EMAIL =========
export function validateEmail(email: string) {
  if (!email) return { valid: false, message: "Email is required" };
  if (!emailRegex.test(email))
    return { valid: false, message: "Invalid email format" };
  return { valid: true, message: "" };
}

// ========= PHONE =========
export function validatePhone(phone: string) {
  if (!phone) return { valid: false, message: "Phone number is required" };
  const valid = isValidPhoneNumber(phone);
  return valid
    ? { valid: true, message: "" }
    : { valid: false, message: "Invalid phone number format" };
}

export function validatePhoneByCountry(
  phone: string,
  countryCode: string,
): { valid: boolean; message: string } {
  if (!phone) return { valid: false, message: "Phone number is required" };
  try {
    const parsed = parsePhoneNumberFromString(
      phone,
      countryCode as CountryCode,
    );
    if (!parsed || !parsed.isValid()) {
      return { valid: false, message: "Invalid phone number format" };
    }
    return { valid: true, message: "" };
  } catch {
    return { valid: false, message: "Invalid phone format or country code" };
  }
}

// Pretty format if needed
export function formatPhoneNumber(value: string): string {
  if (!value) return "";
  try {
    const parsed = parsePhoneNumberFromString(value);
    return parsed ? parsed.formatInternational() : value;
  } catch {
    return value;
  }
}

// ========= NAME / COMPANY =========
export function validateName(name: string) {
  if (!name) return { valid: false, message: "Name is required" };
  if (!nameRegex.test(name))
    return { valid: false, message: "Invalid characters in name" };
  if (!isRealisticName(name))
    return { valid: false, message: "Please enter a realistic name" };
  return { valid: true, message: "" };
}

// <- this is the one your import is complaining about
export function validateSingleWordName(name: string) {
  if (!name) return { valid: false, message: "Name is required" };
  if (/\s/.test(name))
    return {
      valid: false,
      message: "Only one word allowed (e.g., John, Mary-Jane)",
    };
  const singleWordRegex = /^[a-zA-Z'-]{2,50}$/;
  if (!singleWordRegex.test(name))
    return { valid: false, message: "Invalid characters in name" };
  if (!isRealisticName(name))
    return { valid: false, message: "Please enter a realistic name" };
  return { valid: true, message: "" };
}

// optional alias if you prefer this name in some files
export { validateSingleWordName as validateFirstName };

export function validateCompany(name: string) {
  if (!name) return { valid: false, message: "Company name is required" };
  if (!companyNameRegex.test(name))
    return { valid: false, message: "Invalid company name format" };
  return { valid: true, message: "" };
}

// ========= ADDRESS / ZIP / GEO =========
export function validateZipCode(zip: string) {
  if (!zip) return { valid: false, message: "ZIP code is required" };
  if (!zipCodeRegex.test(zip))
    return { valid: false, message: "Invalid ZIP code" };
  return { valid: true, message: "" };
}

export function validateCoordinates(coords: string) {
  if (!coords) return { valid: false, message: "Coordinates are required" };
  if (!coordinateRegex.test(coords))
    return {
      valid: false,
      message: "Invalid coordinate format (e.g., 40.7128, -74.0060)",
    };
  return { valid: true, message: "" };
}

export function parseCoordinates(
  coords: string,
): { lat: number; lng: number } | null {
  const m = coords.match(/^([-+]?\d+\.?\d*),\s*([-+]?\d+\.?\d*)$/);
  if (!m) return null;
  return { lat: Number.parseFloat(m[1]), lng: Number.parseFloat(m[2]) };
}

export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

// ========= FREIGHT FIELDS =========
export function validateWeight(val: string) {
  if (!val) return { valid: false, message: "Weight is required" };
  if (!weightRegex.test(val))
    return { valid: false, message: "Invalid weight format" };
  return { valid: true, message: "" };
}

export function validateDimensions(val: string) {
  if (!val) return { valid: false, message: "Dimensions required" };
  if (!dimensionRegex.test(val))
    return { valid: false, message: "Invalid format (e.g., 2.5x1.5x1.0 ft)" };
  return { valid: true, message: "" };
}

export function validateMoney(val: string) {
  if (!val) return { valid: false, message: "Amount required" };
  if (!/^\d+(\.\d{1,2})?$/.test(val))
    return { valid: false, message: "Invalid money format" };
  return { valid: true, message: "" };
}

// ========= CDL VALIDATION =========
export function validateCDL(cdl: string) {
  if (!cdl) return { valid: false, message: "CDL number is required" };

  // Normalize to uppercase
  const cleaned = cdl.toUpperCase().trim();

  // Typical CDL pattern: 1–2 letters followed by 6–8 digits
  const cdlRegex = /^([A-Z]{1,2})\d{6,8}$/;

  if (!cdlRegex.test(cleaned)) {
    return {
      valid: false,
      message: "Invalid CDL format (use 1–2 letters followed by 6–8 digits)",
    };
  }

  // Additional realism checks
  const letters = cleaned.match(/^[A-Z]{1,2}/)?.[0];
  const digits = cleaned.slice(letters?.length ?? 0);
  if (!letters || digits.length < 6 || digits.length > 8) {
    return {
      valid: false,
      message: "CDL must have 1–2 letters followed by 6–8 numbers",
    };
  }

  return { valid: true, message: "" };
}

export function validateComment(val: string) {
  if (val.length > 500)
    return { valid: false, message: "Comment too long (max 500 chars)" };
  return { valid: true, message: "" };
}

// ========= COUNTRY METADATA =========
const COUNTRY_STORAGE_KEY = "cached_country_metadata_v1";

export async function getCountryMetadata(forceRefresh = false) {
  if (typeof window === "undefined") return [];
  if (!forceRefresh) {
    const cached = localStorage.getItem(COUNTRY_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        /* ignore bad cache */
      }
    }
  }

  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,flags",
    );
    if (!res.ok) throw new Error(`REST Countries API error: ${res.status}`);

    const data = await res.json();
    const countries = data
      .filter((c: any) => c.cca2)
      .map((c: any) => ({
        name: c.name.common,
        code: c.cca2 as CountryCode,
        flag:
          c.flags?.svg ||
          c.flags?.png ||
          `https://flagcdn.com/${String(c.cca2).toLowerCase()}.svg`,
        dialCode: `+${getCountryCallingCode(c.cca2 as CountryCode)}`,
      }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    localStorage.setItem(COUNTRY_STORAGE_KEY, JSON.stringify(countries));
    return countries;
  } catch (e) {
    console.error("Failed to fetch country metadata:", e);
    return [];
  }
}
