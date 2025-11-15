"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Global Manufacturing Inc.",
    role: "Supply Chain Director",
    content:
      "Delta Prime has transformed our logistics operations. Their real-time tracking and predictive analytics have reduced our delivery times by 30%.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    company: "TechCorp Solutions",
    role: "Operations Manager",
    content:
      "The level of professionalism and reliability is unmatched. We've been working with Delta Prime for 5 years and they never disappoint.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    company: "Retail Dynamics",
    role: "Logistics Coordinator",
    content:
      "Their dedicated fleet solutions have been a game-changer for our business. On-time delivery rate is consistently above 99%.",
    rating: 5,
  },
]

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [current])

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="border-2">
        <CardContent className="p-8 md:p-12">
          <div className="flex gap-1 mb-4 justify-center">
            {Array.from({ length: testimonials[current].rating }).map((_, i) => (
              <Star key={i} className="fill-accent text-accent" size={20} />
            ))}
          </div>
          <blockquote className="text-lg md:text-xl text-foreground mb-6 text-center leading-relaxed">
            "{testimonials[current].content}"
          </blockquote>
          <div className="text-center">
            <div className="font-bold text-lg text-foreground">{testimonials[current].name}</div>
            <div className="text-muted-foreground">{testimonials[current].role}</div>
            <div className="text-primary font-semibold">{testimonials[current].company}</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="rounded-full bg-transparent hover:scale-110 hover:shadow-lg transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </Button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-150 ${idx === current ? "bg-primary w-8" : "bg-border"}`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="rounded-full bg-transparent hover:scale-110 hover:shadow-lg transition-all duration-200"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  )
}
