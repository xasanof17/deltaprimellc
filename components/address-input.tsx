"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Loader2 } from "lucide-react"
import { parseCoordinates } from "@/lib/validation"

interface AddressInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string, coordinates?: { lat: number; lng: number }) => void
  required?: boolean
  error?: string
}

interface AddressSuggestion {
  display_name: string
  lat: string
  lon: string
}

const geocodeCache = new Map<string, AddressSuggestion[]>()
const CACHE_EXPIRY = 5 * 60 * 1000 // 5 minutes
const cacheTimestamps = new Map<string, number>()

export function AddressInput({ id, label, value, onChange, required, error }: AddressInputProps) {
  const [useCoordinates, setUseCoordinates] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isPasteSearch, setIsPasteSearch] = useState(false)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const previousValueRef = useRef<string>("")
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchGeocodeSuggestions = useCallback(
    async (searchValue: string) => {
      // Check cache first
      const cached = geocodeCache.get(searchValue)
      const cacheTime = cacheTimestamps.get(searchValue)

      if (cached && cacheTime && Date.now() - cacheTime < CACHE_EXPIRY) {
        console.log("[v0] 📦 Using cached geocoding results")
        setSuggestions(cached)
        setShowSuggestions(true)
        setIsSearching(false)

        if (isPasteSearch && cached.length > 0) {
          const { lat, lon, display_name } = cached[0]
          onChange(display_name, { lat: Number.parseFloat(lat), lng: Number.parseFloat(lon) })
          setShowSuggestions(false)
          setIsPasteSearch(false)
        }
        return
      }

      // Abort previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}&limit=5&addressdetails=1`,
          {
            headers: { "User-Agent": "DeltaPrimeLogistics/1.0" },
            signal: abortControllerRef.current.signal,
          },
        )
        const data = await response.json()

        if (data && data.length > 0) {
          // Cache the results
          geocodeCache.set(searchValue, data)
          cacheTimestamps.set(searchValue, Date.now())

          setSuggestions(data)
          setShowSuggestions(true)

          if (isPasteSearch) {
            const { lat, lon, display_name } = data[0]
            onChange(display_name, { lat: Number.parseFloat(lat), lng: Number.parseFloat(lon) })
            setShowSuggestions(false)
            setIsPasteSearch(false)
          }
        } else {
          setSuggestions([])
          setShowSuggestions(false)
          setIsPasteSearch(false)
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("[v0] ❌ Geocoding error:", error)
        }
        setSuggestions([])
        setShowSuggestions(false)
        setIsPasteSearch(false)
      } finally {
        setIsSearching(false)
      }
    },
    [onChange, isPasteSearch],
  )

  useEffect(() => {
    if (previousValueRef.current === value) {
      return
    }
    previousValueRef.current = value

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (!value || value.length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const coords = parseCoordinates(value)
    if (coords) {
      setSuggestions([])
      setShowSuggestions(false)
      onChange(value, coords)
      return
    }

    setIsSearching(true)
    debounceTimerRef.current = setTimeout(() => {
      fetchGeocodeSuggestions(value)
    }, 600)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [value, onChange, fetchGeocodeSuggestions])

  const handleInputChange = (inputValue: string) => {
    const coords = parseCoordinates(inputValue)
    if (coords) {
      onChange(inputValue, coords)
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    onChange(inputValue)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text")

    const coords = parseCoordinates(pastedText)
    if (coords) {
      onChange(pastedText, coords)
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    if (pastedText.length >= 3) {
      setIsPasteSearch(true)
      setIsSearching(true)
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      setTimeout(() => {
        fetchGeocodeSuggestions(pastedText)
      }, 100)
    }
  }

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name, {
      lat: Number.parseFloat(suggestion.lat),
      lng: Number.parseFloat(suggestion.lon),
    })
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    setIsLoadingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: { "User-Agent": "DeltaPrimeLogistics/1.0" },
            },
          )
          const data = await response.json()

          if (data.display_name) {
            onChange(data.display_name, { lat: latitude, lng: longitude })
          } else {
            onChange(`${latitude}, ${longitude}`, { lat: latitude, lng: longitude })
          }
        } catch (error) {
          onChange(`${latitude}, ${longitude}`, { lat: latitude, lng: longitude })
        }

        setIsLoadingLocation(false)
      },
      (error) => {
        setIsLoadingLocation(false)
        alert("Unable to retrieve your location: " + error.message)
      },
    )
  }

  return (
    <div className="space-y-2 relative">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="text-xs sm:text-sm font-medium shrink-0">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setUseCoordinates(!useCoordinates)}
            className="h-7 px-2 text-xs text-blue-900 hover:text-orange-500"
          >
            <MapPin className="w-3 h-3 sm:mr-1" />
            <span className="hidden sm:inline text-xs font-normal">
              {useCoordinates ? "Use Address" : "Use Coordinates"}
            </span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleGetCurrentLocation}
            disabled={isLoadingLocation}
            className="h-7 px-2 text-xs text-blue-900 hover:text-orange-500"
          >
            <Navigation className="w-3 h-3 sm:mr-1" />
            <span className="hidden sm:inline text-xs font-normal">
              {isLoadingLocation ? "Getting..." : "Current Location"}
            </span>
          </Button>
        </div>
      </div>

      <div className="relative">
        <Input
          id={id}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onPaste={handlePaste}
          placeholder={useCoordinates ? "40.7128, -74.0060" : "Search address..."}
          required={required}
          className={`text-sm ${error ? "border-red-500" : ""}`}
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      {error && <p className="text-xs sm:text-sm text-red-500">{error}</p>}

      {value && parseCoordinates(value) && (
        <p className="text-xs text-green-600">
          ✓ Valid coordinates: {parseCoordinates(value)?.lat.toFixed(6)}, {parseCoordinates(value)?.lng.toFixed(6)}
        </p>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-sm hover:bg-muted transition-colors border-b border-border last:border-b-0 flex items-start gap-2"
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-blue-900 shrink-0" />
              <span className="text-foreground">{suggestion.display_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
