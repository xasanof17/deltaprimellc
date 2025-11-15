"use client"

import { useEffect, useRef, useState } from "react"
import { Truck, MapPin } from "lucide-react"

interface RouteCanvasProps {
  origin?: { lat: number; lng: number }
  destination?: { lat: number; lng: number }
  originLabel?: string
  destinationLabel?: string
}

// Calculate distance using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function RouteCanvas({ origin, destination, originLabel, destinationLabel }: RouteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [distance, setDistance] = useState<number>(0)
  const [routeCoordinates, setRouteCoordinates] = useState<Array<[number, number]>>([])
  const [isLoadingRoute, setIsLoadingRoute] = useState(false)

  useEffect(() => {
    if (!origin || !destination) {
      setDistance(0)
      setRouteCoordinates([])
      return
    }

    const fetchRoute = async () => {
      setIsLoadingRoute(true)
      try {
        // OSRM API endpoint - using public demo server
        const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`

        console.log("[v0] Fetching route from OSRM...")
        const response = await fetch(url)
        const data = await response.json()

        if (data.code === "Ok" && data.routes && data.routes.length > 0) {
          const route = data.routes[0]
          const coords = route.geometry.coordinates as Array<[number, number]>
          setRouteCoordinates(coords)

          // Distance from OSRM in meters, convert to miles
          const distanceInMiles = route.distance / 1609.34
          setDistance(distanceInMiles)
          console.log(`[v0] ✅ Route fetched: ${distanceInMiles.toFixed(0)} miles, ${coords.length} points`)
        } else {
          console.log("[v0] ⚠️ OSRM returned no route, using straight line")
          // Fallback to straight line
          const dist = calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng)
          setDistance(dist)
          setRouteCoordinates([])
        }
      } catch (error) {
        console.error("[v0] ❌ Error fetching route from OSRM:", error)
        // Fallback to straight line calculation
        const dist = calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng)
        setDistance(dist)
        setRouteCoordinates([])
      } finally {
        setIsLoadingRoute(false)
      }
    }

    fetchRoute()
  }, [origin, destination])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !origin || !destination) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = rect.width
    const height = rect.height
    const padding = 60

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    let minLat = origin.lat
    let maxLat = origin.lat
    let minLng = origin.lng
    let maxLng = origin.lng

    if (routeCoordinates.length > 0) {
      routeCoordinates.forEach(([lng, lat]) => {
        minLat = Math.min(minLat, lat)
        maxLat = Math.max(maxLat, lat)
        minLng = Math.min(minLng, lng)
        maxLng = Math.max(maxLng, lng)
      })
    } else {
      minLat = Math.min(origin.lat, destination.lat)
      maxLat = Math.max(origin.lat, destination.lat)
      minLng = Math.min(origin.lng, destination.lng)
      maxLng = Math.max(origin.lng, destination.lng)
    }

    // Add padding to bounds
    const latPadding = (maxLat - minLat) * 0.1 || 0.1
    const lngPadding = (maxLng - minLng) * 0.1 || 0.1
    minLat -= latPadding
    maxLat += latPadding
    minLng -= lngPadding
    maxLng += lngPadding

    // Project lat/lng to canvas coordinates
    const projectPoint = (lat: number, lng: number): [number, number] => {
      const x = padding + ((lng - minLng) / (maxLng - minLng)) * (width - 2 * padding)
      const y = height - padding - ((lat - minLat) / (maxLat - minLat)) * (height - 2 * padding)
      return [x, y]
    }

    const [originX, originY] = projectPoint(origin.lat, origin.lng)
    const [destX, destY] = projectPoint(destination.lat, destination.lng)

    if (routeCoordinates.length > 0) {
      // Draw dashed background line
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 2
      ctx.setLineDash([8, 4])
      ctx.beginPath()
      routeCoordinates.forEach(([lng, lat], index) => {
        const [x, y] = projectPoint(lat, lng)
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()
      ctx.setLineDash([])

      // Draw gradient route line
      const gradient = ctx.createLinearGradient(originX, originY, destX, destY)
      gradient.addColorStop(0, "#1E3A8A") // Deep blue
      gradient.addColorStop(1, "#FFA500") // Orange

      ctx.strokeStyle = gradient
      ctx.lineWidth = 4
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.beginPath()
      routeCoordinates.forEach(([lng, lat], index) => {
        const [x, y] = projectPoint(lat, lng)
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()
    } else {
      // Fallback: Draw straight line
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 2
      ctx.setLineDash([8, 4])
      ctx.beginPath()
      ctx.moveTo(originX, originY)
      ctx.lineTo(destX, destY)
      ctx.stroke()
      ctx.setLineDash([])

      const gradient = ctx.createLinearGradient(originX, originY, destX, destY)
      gradient.addColorStop(0, "#1E3A8A")
      gradient.addColorStop(1, "#FFA500")

      ctx.strokeStyle = gradient
      ctx.lineWidth = 4
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(originX, originY)
      ctx.lineTo(destX, destY)
      ctx.stroke()
    }

    // Draw origin marker
    ctx.fillStyle = "#1E3A8A"
    ctx.beginPath()
    ctx.arc(originX, originY, 12, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw destination marker
    ctx.fillStyle = "#FFA500"
    ctx.beginPath()
    ctx.arc(destX, destY, 12, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw labels
    ctx.font = "bold 13px Geist, sans-serif"
    ctx.textAlign = "center"
    ctx.fillStyle = "#1E3A8A"
    ctx.fillText(originLabel || "Origin", originX, originY - 25)
    ctx.fillStyle = "#FFA500"
    ctx.fillText(destinationLabel || "Destination", destX, destY - 25)

    // Draw distance in the middle
    if (distance > 0) {
      const midX = (originX + destX) / 2
      const midY = (originY + destY) / 2 - 10
      ctx.font = "bold 14px Geist, sans-serif"
      ctx.fillStyle = "#333333"
      ctx.fillText(`${distance.toFixed(0)} miles`, midX, midY)
    }
  }, [origin, destination, originLabel, destinationLabel, distance, routeCoordinates])

  if (!origin || !destination) {
    return (
      <div className="w-full h-48 bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
        <div className="text-center">
          <MapPin className="mx-auto mb-2 text-muted-foreground/50" size={32} />
          <p>Enter both origin and destination to see route visualization</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <canvas ref={canvasRef} className="w-full h-48 bg-muted/30 rounded-lg" />
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-primary" />
          <span>{isLoadingRoute ? "Calculating route..." : `Estimated Distance: ${distance.toFixed(0)} miles`}</span>
        </div>
        {!isLoadingRoute && distance > 0 && (
          <>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>~{Math.ceil(distance / 50)} hours driving</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
