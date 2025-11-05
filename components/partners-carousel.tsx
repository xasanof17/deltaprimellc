"use client"

import { useEffect, useRef } from "react"

const partners = [
  { name: "C.H. Robinson", logo: "/partners/ch-robinson.jpg" },
  { name: "Coyote Logistics", logo: "/partners/coyote.jpg" },
  { name: "J.B. Hunt", logo: "/partners/jb-hunt.jpg" },
  { name: "PrePass", logo: "/partners/prepass.jpg" },
  { name: "FedEx", logo: "/partners/fedex.jpg" },
  { name: "RPM", logo: "/partners/rpm.jpg" },
  { name: "RFX REFE", logo: "/partners/rfx-refe.jpg" },
  { name: "Samsara", logo: "/partners/samsara.jpg" },
  { name: "TT ELD", logo: "/partners/tt-eld.jpg" },
  { name: "Quick Manage", logo: "/partners/quickmanage.jpg" },
  { name: "Pilot Flying J", logo: "/partners/pilot.jpg" },
  { name: "Trans Chicago", logo: "/partners/trans-chicago.jpg" },
  { name: "Bestpass", logo: "/partners/bestpass.jpg" },
  { name: "Armstrong", logo: "/partners/armstrong.jpg" },
  { name: "MoLo Solutions", logo: "/partners/molo.jpg" },
  { name: "Mercer", logo: "/partners/mercer.jpg" },
  { name: "Arrive Logistics", logo: "/partners/arrive.jpg" },
  { name: "NTG", logo: "/partners/ntg.jpg" },
  { name: "Flock Freight", logo: "/partners/flock.jpg" },
]

export function PartnersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scroll = () => {
      scrollPosition += 0.5
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, 20)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="relative overflow-hidden py-12 bg-background">
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10" />

      <div ref={scrollRef} className="flex gap-12 overflow-x-hidden" style={{ scrollBehavior: "auto" }}>
        {/* Duplicate the partners array for seamless loop */}
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={index}
            className="shrink-0 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          >
            <img
              src={partner.logo || "/placeholder.svg"}
              alt={partner.name}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.currentTarget.style.display = "none"
                e.currentTarget.parentElement!.innerHTML =
                  `<span class="text-lg font-bold text-foreground">${partner.name}</span>`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
