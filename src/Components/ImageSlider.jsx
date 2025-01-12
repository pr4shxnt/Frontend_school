'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    image: 'https://scontent.fktm3-1.fna.fbcdn.net/v/t1.6435-9/141719162_739615303329419_8447435423385099463_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=XMoQFKlWm_4Q7kNvgHF9BCQ&_nc_oc=AdggcZDCgckvvpMgMDwy2Hn8b-GKN7QjBFYAcP5ry4ejzjOX4ZHPc3h5Bfy0Ca3DVX0&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AoC8-UDHvrQRJ6qog05BuFQ&oh=00_AYA5zx2ZIPcV3jH3ZGJqcY8kc9Tb-5xaIH-wlVEeVaxd2w&oe=67A42517',
    title: 'The Best School',
    description: 'Get Ready to learn inside one of the finest schools in city.',
    buttonText: 'Applications',
    link: '/mountains',
  },
  {
    image: 'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/469311898_1584390355518572_8130121372047966494_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=BPyhak_LFBAQ7kNvgG5BUmk&_nc_oc=AdiFWAyyqTaPzaBCNcv5LnRk_ekpF0mGexT5af1p-HNnzP3xBO8ygmWhKpSJJ4_n7bc&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AHgOBZNAzgAYyKLZbTuvEK4&oh=00_AYD48bHtJHXfk3AuSfN6peRBVOr7xSDgNeazUlhtfTXJJg&oe=6782A3CB',
    title: 'Serene Beaches',
    description: 'Relax on pristine sandy shores',
    buttonText: 'Book a Beach Trip',
    link: '/beaches',
  },
  {
    image: '/placeholder.svg?height=1080&width=1920',
    title: 'Lush Forests',
    description: 'Discover the wonders of nature',
    buttonText: 'Explore Trails',
    link: '/forests',
  },
  {
    image: '/placeholder.svg?height=1080&width=1920',
    title: 'Vibrant Cities',
    description: 'Experience urban adventures',
    buttonText: 'City Guide',
    link: '/cities',
  },
  {
    image: '/placeholder.svg?height=1080&width=1920',
    title: 'Ancient Ruins',
    description: 'Uncover the mysteries of the past',
    buttonText: 'Historical Tours',
    link: '/ruins',
  },
]

const SLIDE_DURATION = 10000 // 10 seconds

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
  }, [currentIndex])

  const goToNext = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % slides.length)
  }, [currentIndex])

  useEffect(() => {
    const timer = setInterval(goToNext, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [goToNext])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-[3000ms] ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
        </div>
      ))}

      {/* Slide Content */}
      <div className="absolute bottom-16 right-0 left-0 px-1 md:left-16 md:bottom-10 md:right-10 text-white z-10 text-center md:text-left max-w-lg">
        <h2 className="text-5xl font-bold mb-4">
          {slides[currentIndex].title}
        </h2>
        <p className="text-xl mb-8">
          {slides[currentIndex].description}
        </p>
        <a
          href={slides[currentIndex].link}
          className="inline-block bg-white text-black px-8 py-3 rounded-full hover:bg-opacity-80"
        >
          {slides[currentIndex].buttonText}
        </a>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-2 items-center left-1/2 transform -translate-x-1/2 flex space-x-3">
        <button
          onClick={goToPrevious}
          aria-label="Previous Slide"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          <ChevronLeft size={20} />
        </button>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125 w-3' : 'bg-gray-400'
            }`}
          />
        ))}
        <button
          onClick={goToNext}
          aria-label="Next Slide"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
