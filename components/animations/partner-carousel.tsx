"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useAnimationFrame } from "framer-motion"

const partners = [
  {
    name: "Amazon Freight",
    logo: "/partners/amazon.png",
  },
    {
    name: "AmTrust",
    logo: "/partners/amtrust-logo.svg",
  },
  {
    name: "Flock Freight",
    logo: "/partners/flock-freight.svg",
  },
  {
    name: "Arrive Logistics",
    logo: "/partners/arrive-logistics.webp",
  },
  {
    name: "FedEx",
    logo: "/partners/fedex.svg",
  },
  {
    name: "Fusion",
    logo: "/partners/fusion-logo.png",
  },
  { 
    name: "Freightliner",
    logo: "/partners/freightliner-logo.png",
  },
  {
    name: "Coyote Logistics",
    logo: "/partners/coyote-logistics.svg",
  },
  {
    name: "BestPass",
    logo: "/partners/best-pass.png",
  },
  {
    name: "Armstrong",
    logo: "/partners/armstrong.png",
  },
  {
    name: "CH Robinson",
    logo: "/partners/ch-robinson.svg",
  },
  {
    name: "Uber",
    logo: "/partners/uber.svg",
  },
  {
    name: "Trans Chicago",
    logo: "/partners/trans-chicago.png",
  },
  {
    name: "QuickManage",
    logo: "/partners/quickmanage.svg",
  },
  {
    name: "RPM",
    logo: "/partners/rpm.svg",
  },
  {
    name: "Volvo",
    logo: "/partners/volvo.svg",
  },
  {
    name: "TT ELD",
    logo: "/partners/tt-eld.svg",
  },
  {
    name: "RFX",
    logo: "/partners/rfx.svg",
  },
  {
    name: "Samsara",
    logo: "/partners/samsara.svg",
  },
  {
    name: "Triumph",
    logo: "/partners/triumph-logo.svg",
  },
  {
    name: "Mercer",
    logo: "/partners/mercer.svg",
  },
  {
    name: "NTG",
    logo: "/partners/ntg-logo.svg",
  },
  {
    name: "Molo",
    logo: "/partners/molo-logo.png",
  },
  {
    name: "JB Hunt",
    logo: "/partners/jb-hunt.svg",
  },
  {
    name: "PrePass",
    logo: "/partners/pre-pass.svg",
  },
  {
    name: "Pilot Flying J",
    logo: "/partners/pilot-flying-j.svg",
  },
]

export function PartnerCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const [isUserControlling, setIsUserControlling] = useState(false)
  const x = useMotionValue(0)
  const userControlTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const LOGO_WIDTH = 192 // w-48 = 192px
  const GAP = 80 // gap-20 = 80px
  const ITEM_WIDTH = LOGO_WIDTH + GAP
  const totalWidth = partners.length * ITEM_WIDTH

  useAnimationFrame((t, delta) => {
    if (!isPaused && !isUserControlling) {
      const speed = -0.15
      let newX = x.get() + speed * delta

      // Wrap around seamlessly using modulo
      if (newX <= -totalWidth) {
        newX = newX % totalWidth
      }

      x.set(newX)
    }
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault()
        setIsUserControlling(true)

        const currentX = x.get()
        const moveAmount = e.key === "ArrowLeft" ? ITEM_WIDTH : -ITEM_WIDTH
        let newX = currentX + moveAmount

        // Wrap position if needed
        if (newX <= -totalWidth) {
          newX = newX % totalWidth
        } else if (newX > 0) {
          newX = -(totalWidth + newX)
        }

        x.set(newX)

        // Resume auto-scroll after 1 second of no interaction
        if (userControlTimeoutRef.current) {
          clearTimeout(userControlTimeoutRef.current)
        }
        userControlTimeoutRef.current = setTimeout(() => {
          setIsUserControlling(false)
        }, 1000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (userControlTimeoutRef.current) {
        clearTimeout(userControlTimeoutRef.current)
      }
    }
  }, [x, totalWidth, ITEM_WIDTH])

  const extendedPartners = [...partners, ...partners, ...partners]

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-12 lg:py-16">
      <motion.div
        className="flex cursor-grab items-center gap-24 active:cursor-grabbing"
        drag="x"
        dragElastic={0.05}
        dragConstraints={{ left: -totalWidth * 2, right: 0 }}
        style={{ x }}
        transition={{ ease: "linear", duration: 0.1, repeat: Infinity }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onDragStart={() => {
          setIsUserControlling(true)
        }}
        onDragEnd={() => {
          // Resume auto-scroll after 1 second
          if (userControlTimeoutRef.current) {
            clearTimeout(userControlTimeoutRef.current)
          }
          userControlTimeoutRef.current = setTimeout(() => {
            setIsUserControlling(false)
          }, 1000)
        }}
      >
        {extendedPartners.map((partner, index) => (
          <motion.div
            key={`${partner.name}-${index}`}
            className="group relative flex lg:h-34 h-36 w-36 lg:w-48 shrink-0 items-center justify-center shadow-2xk"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1]}}
          >
            <motion.img
              src={partner.logo}
              alt={partner.name}
              className="max-h-full max-w-full object-contain grayscale opacity-80 transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100"
              loading="lazy"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
