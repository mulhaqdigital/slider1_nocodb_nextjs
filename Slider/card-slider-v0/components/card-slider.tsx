"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useMobile } from "@/hooks/use-mobile"

/**
 * Interface defining the structure of a card item
 * @interface CardItem
 * @property {string} title - The title of the card
 * @property {string} description - The description text
 * @property {string} author - The author's name
 * @property {string} imageUrl - URL of the card's image
 * @property {string} link - Optional link for the card
 */
interface CardItem {
  title: string
  description: string
  author: string
  imageUrl: string
  link: string
}

/**
 * CardSlider Component
 * A responsive card slider that supports touch/mouse drag interactions and API data fetching
 * @component
 * @returns {JSX.Element}
 */
export default function CardSlider() {
  // State management for cards and UI states
  const [cards, setCards] = useState<CardItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Refs and state for scroll functionality
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  // Hook to detect mobile devices
  const isMobile = useMobile()

  /**
   * Mouse down event handler for drag scrolling
   * @param {React.MouseEvent} e - Mouse event
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  /**
   * Mouse up event handler to stop dragging
   */
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  /**
   * Mouse move event handler for drag scrolling
   * @param {React.MouseEvent} e - Mouse event
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  /**
   * Touch start event handler for mobile drag scrolling
   * @param {React.TouchEvent} e - Touch event
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  /**
   * Touch move event handler for mobile drag scrolling
   * @param {React.TouchEvent} e - Touch event
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  /**
   * Effect hook to fetch card data from NocoDB API
   */
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true)
        setError(null)
        // API call to NocoDB
        const response = await axios.get("https://app.nocodb.com/api/v2/tables/msvdzpdvnlr06r0/records", {
          headers: {
            "xc-token": "lYRPLV022asQhcc8_rWP9K8iyA9fuDhSzTidAVF3",
          },
          params: {
            offset: 0,
            limit: 25,
            viewId: "vwlr2utkuotlfa2f",
          },
        })
        
        // Transform API data to match CardItem interface
        const cardData = response.data?.list || response.data || []
        const mappedCards = cardData.map((card: any) => ({
          title: card.title,
          description: card.description,
          author: card.author,
          imageUrl: card.imageurl || "",
          link: card.link,
        }))
        setCards(mappedCards)
      } catch (error: any) {
        console.error("Error details:", error)
        // Handle different error scenarios
        setError(
          error.response?.status === 404
            ? "Unable to connect to the database. Please verify the table ID and view ID."
            : error.response?.status === 401 || error.response?.status === 403
              ? "Authentication failed. Please verify your API token."
              : `Failed to load cards: ${error.message}`,
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  /**
   * Handler for scrolling the slider to the left
   */
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? -260 : -320 // Adjust scroll amount based on device
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  /**
   * Handler for scrolling the slider to the right
   */
  const handleScrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 260 : 320 // Adjust scroll amount based on device
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Loading state UI
  if (loading) {
    return (
      <div className="text-center p-2 sm:p-4 text-lg text-muted-foreground">
        <div className="flex space-x-2 sm:space-x-4 overflow-x-auto py-2 sm:py-4">
          {/* Render skeleton cards while loading */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[260px] sm:min-w-[280px] h-[400px] sm:h-[450px] border-2 border-[#dddddd] rounded-[15px] p-3 sm:p-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-center bg-white relative overflow-hidden touch-pan-x"
            >
              {/* Skeleton layout structure */}
              <div className="h-[200px] sm:h-[280px] w-full rounded-[10px] overflow-hidden bg-[#f0f0f0]">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-3 sm:mt-[15px]">
                <Skeleton className="h-4 sm:h-5 w-3/4 mx-auto" />
              </div>
              <div className="mt-2 sm:mt-[10px]">
                <Skeleton className="h-3 sm:h-4 w-full mb-2" />
                <Skeleton className="h-3 sm:h-4 w-5/6 mx-auto" />
              </div>
              <div className="mt-2 sm:mt-[10px]">
                <Skeleton className="h-3 sm:h-4 w-1/2 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error state UI
  if (error) {
    return <div className="text-center p-5 text-destructive bg-destructive/10 rounded-lg m-5">{error}</div>
  }

  // Empty state UI
  if (!cards.length) {
    return <div className="text-center p-5 text-lg text-muted-foreground">No cards available.</div>
  }

  // Main slider UI
  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden py-2 sm:py-5">
      {/* Navigation Buttons - Hidden on mobile */}
      {!isMobile && (
        <>
          <Button
            onClick={handleScrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 h-auto nav-button bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] text-white hidden sm:flex"
            size="icon"
            variant="secondary"
          >
            <ChevronLeft className="h-4 sm:h-6 w-4 sm:w-6" />
            <span className="sr-only">Scroll left</span>
          </Button>

          <Button
            onClick={handleScrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 h-auto nav-button bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] text-white hidden sm:flex"
            size="icon"
            variant="secondary"
          >
            <ChevronRight className="h-4 sm:h-6 w-4 sm:w-6" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-2 sm:gap-5 overflow-x-auto px-2 sm:px-5 py-2 sm:py-4 scroll-smooth touch-pan-x card-container hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* Render cards */}
        {cards.map((card, index) => (
          <CardItem
            key={index}
            title={card.title}
            description={card.description}
            author={card.author}
            imageUrl={card.imageUrl}
            link={card.link}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * CardItem Component
 * Individual card component within the slider
 * @component
 * @param {CardItem} props - Card item properties
 * @returns {JSX.Element}
 */
function CardItem({ title, description, author, imageUrl, link }: CardItem) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const isMobile = useMobile()

  /**
   * Handler for image load errors
   */
  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  /**
   * Handler for successful image loads
   */
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div
      className={`
        min-w-[260px] sm:min-w-[280px] h-[400px] sm:h-[450px]
        border-2 border-[#dddddd] rounded-[15px] p-3 sm:p-[15px]
        shadow-[0_4px_12px_rgba(0,0,0,0.1)]
        text-center font-[Arial,sans-serif] bg-white
        scroll-snap-center
        ${link ? "cursor-pointer" : "cursor-default"}
        relative overflow-hidden
        transition-[transform,box-shadow] duration-200
        m-[0_2px] sm:m-[0_5px]
        [webkit-tap-highlight-color:transparent]
        touch-pan-x
        flex flex-col
      `}
      onClick={() => link && window.open(link, "_blank")}
      onMouseEnter={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = "translateY(-5px)"
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)"
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
        }
      }}
    >
      {/* Card Image Container */}
      <div className="relative w-full h-[180px] sm:h-[220px] bg-[#f0f0f0] rounded-[10px] overflow-hidden mb-3 sm:mb-4">
        {/* Loading skeleton */}
        {!imageLoaded && <div className="skeleton absolute inset-0 w-full h-full"></div>}
        
        {/* Image or fallback */}
        {!imageError ? (
          <Image
            src={imageUrl || "https://via.placeholder.com/280x280?text=No+Image"}
            alt={title || "Card image"}
            fill
            className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-[#f0f0f0] text-[#666] text-sm p-5 text-center">
            Image not available
          </div>
        )}
      </div>

      {/* Card Content */}
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 line-clamp-3">{description}</p>
      <p className="text-xs sm:text-sm text-gray-500 mt-auto">{author}</p>
    </div>
  )
}

// CSS for hiding scrollbar while maintaining functionality
const styles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

