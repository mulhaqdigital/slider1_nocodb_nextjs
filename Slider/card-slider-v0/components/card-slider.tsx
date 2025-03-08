"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface CardItem {
  title: string
  description: string
  author: string
  imageUrl: string
  link: string
}

export default function CardSlider() {
  const [cards, setCards] = useState<CardItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Touch and mouse event handlers for smooth scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    // Fetch data from NocoDB public API
    const fetchCards = async () => {
      try {
        setLoading(true)
        setError(null)
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

  // Function to scroll left
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  // Function to scroll right
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  if (loading) {
    return (
      <div className="text-center p-5 text-lg text-muted-foreground">
        <div className="flex space-x-4 overflow-x-auto py-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[280px] h-[450px] border-2 border-[#dddddd] rounded-[15px] p-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-center bg-white relative overflow-hidden m-[0_5px] touch-pan-x"
            >
              <div className="h-[280px] w-full rounded-[10px] overflow-hidden bg-[#f0f0f0]">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-[15px]">
                <Skeleton className="h-5 w-3/4 mx-auto" />
              </div>
              <div className="mt-[10px]">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
              </div>
              <div className="mt-[10px]">
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center p-5 text-destructive bg-destructive/10 rounded-lg m-5">{error}</div>
  }

  if (!cards.length) {
    return <div className="text-center p-5 text-lg text-muted-foreground">No cards available.</div>
  }

  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden py-5">
      {/* Left Navigation Button */}
      <Button
        onClick={handleScrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 h-auto nav-button bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] text-white"
        size="icon"
        variant="secondary"
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Scroll left</span>
      </Button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-5 py-4 scroll-smooth touch-pan-x card-container hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
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

      {/* Right Navigation Button */}
      <Button
        onClick={handleScrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 h-auto nav-button bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] text-white"
        size="icon"
        variant="secondary"
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Scroll right</span>
      </Button>
    </div>
  )
}

function CardItem({ title, description, author, imageUrl, link }: CardItem) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Function to handle image error
  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  // Function to handle image load
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div
      className={`
        min-w-[280px] h-[450px] 
        border-2 border-[#dddddd] rounded-[15px] p-[15px] 
        shadow-[0_4px_12px_rgba(0,0,0,0.1)] 
        text-center font-[Arial,sans-serif] bg-white 
        scroll-snap-center 
        ${link ? "cursor-pointer" : "cursor-default"} 
        relative overflow-hidden 
        transition-[transform,box-shadow] duration-200 
        m-[0_5px] 
        [webkit-tap-highlight-color:transparent] 
        touch-pan-x
        flex flex-col
      `}
      onClick={() => link && window.open(link, "_blank")}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)"
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <div className="relative w-full h-[220px] bg-[#f0f0f0] rounded-[10px] overflow-hidden mb-4">
        {!imageLoaded && <div className="skeleton absolute inset-0 w-full h-full"></div>}
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

      <div className="flex flex-col flex-grow px-2">
        <h3 className="text-[20px] font-semibold leading-tight mb-3 overflow-hidden text-[#333] line-clamp-2 min-h-[50px]">
          {title || "Untitled"}
        </h3>

        <p className="text-[16px] leading-snug mb-4 overflow-hidden text-[#666] line-clamp-4 flex-grow">
          {description || "No description available"}
        </p>

        <p className="italic text-[#888] text-[14px] mt-auto pb-2">By {author || "Unknown"}</p>
      </div>
    </div>
  )
}

