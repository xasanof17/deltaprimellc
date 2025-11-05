"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { phoneCountries, formatPhoneNumberByCountry } from "@/lib/validation"
import { Search } from "lucide-react"

interface PhoneInputProps {
  id: string
  label?: string
  value: string
  countryCode: string
  onPhoneChange: (phone: string) => void
  onCountryChange: (countryCode: string) => void
  error?: string
  required?: boolean
  onBlur?: () => void
}

const CountryFlags = {
  "+1": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="60" height="30" fill="#B22234" />
      <path
        d="M0,3.46h60M0,6.92h60M0,10.38h60M0,13.84h60M0,17.3h60M0,20.76h60M0,24.22h60M0,27.68h60"
        stroke="#fff"
        strokeWidth="3.46"
      />
      <rect width="24" height="17.3" fill="#3C3B6E" />
    </svg>
  ),
  "+998": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="60" height="10" fill="#1EB53A" />
      <rect y="10" width="60" height="10" fill="#FFF" />
      <rect y="20" width="60" height="10" fill="#0099B5" />
      <rect y="9" width="60" height="2" fill="#CE1126" />
      <rect y="19" width="60" height="2" fill="#CE1126" />
    </svg>
  ),
  "+44": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
  "+91": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="60" height="10" fill="#FF9933" />
      <rect y="10" width="60" height="10" fill="#FFF" />
      <rect y="20" width="60" height="10" fill="#138808" />
      <circle cx="30" cy="15" r="4" fill="none" stroke="#000080" strokeWidth="0.5" />
    </svg>
  ),
  "+86": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="60" height="30" fill="#DE2910" />
      <polygon points="10,6 11,9 14,9 11.5,11 12.5,14 10,12 7.5,14 8.5,11 6,9 9,9" fill="#FFDE00" />
    </svg>
  ),
  "+49": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="60" height="10" fill="#000" />
      <rect y="10" width="60" height="10" fill="#D00" />
      <rect y="20" width="60" height="10" fill="#FFCE00" />
    </svg>
  ),
  "+33": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="20" height="30" fill="#002395" />
      <rect x="20" width="20" height="30" fill="#FFF" />
      <rect x="40" width="20" height="30" fill="#ED2939" />
    </svg>
  ),
  "+7": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="60" height="10" fill="#FFF" />
      <rect y="10" width="60" height="10" fill="#0039A6" />
      <rect y="20" width="60" height="10" fill="#D52B1E" />
    </svg>
  ),
  "+81": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="60" height="30" fill="#FFF" />
      <circle cx="30" cy="15" r="9" fill="#BC002D" />
    </svg>
  ),
  "+971": () => (
    <svg className="w-5 h-4" viewBox="0 0 60 30">
      <rect width="60" height="10" fill="#00732F" />
      <rect y="10" width="60" height="10" fill="#FFF" />
      <rect y="20" width="60" height="10" fill="#000" />
      <rect width="20" height="30" fill="#FF0000" />
    </svg>
  ),
}

export function PhoneInput({
  id,
  label = "Phone Number",
  value,
  countryCode,
  onPhoneChange,
  onCountryChange,
  error,
  required = false,
  onBlur,
}: PhoneInputProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const selectedCountry = phoneCountries.find((c) => c.code === countryCode) || phoneCountries[0]
  const FlagComponent = CountryFlags[countryCode as keyof typeof CountryFlags]

  const filteredCountries = phoneCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery) ||
      country.code.replace("+", "").includes(searchQuery),
  )

  const handlePhoneChange = (inputValue: string) => {
    const formatted = formatPhoneNumberByCountry(inputValue, countryCode)
    onPhoneChange(formatted)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex gap-2">
        <Select value={countryCode} onValueChange={onCountryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              <span className="flex items-center gap-2">
                {FlagComponent && <FlagComponent />}
                <span className="font-medium">{selectedCountry.code}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px] z-[9999]">
            <div className="px-2 py-2 border-b sticky top-0 bg-popover z-10">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className="max-h-[250px] overflow-y-auto overscroll-contain">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => {
                  const Flag = CountryFlags[country.code as keyof typeof CountryFlags]
                  return (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center gap-2">
                        {Flag && <Flag />}
                        <span className="font-medium">{country.code}</span>
                        <span className="text-muted-foreground text-sm">{country.name}</span>
                      </span>
                    </SelectItem>
                  )
                })
              ) : (
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">No countries found</div>
              )}
            </div>
          </SelectContent>
        </Select>
        <div className="flex-1">
          <Input
            id={id}
            type="tel"
            value={value}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={onBlur}
            className={error ? "border-red-500" : ""}
            placeholder={selectedCountry.placeholder}
            required={required}
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <p className="text-xs text-muted-foreground">
        Format: {selectedCountry.code} {selectedCountry.placeholder}
      </p>
    </div>
  )
}
