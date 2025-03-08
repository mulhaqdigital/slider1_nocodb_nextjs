/**
 * Main Home Page Component
 * Renders the landing page with a card slider
 * 
 * Layout Structure:
 * - Container with responsive padding
 * - Heading with responsive text size
 * - Card Slider component
 * 
 * @component
 * @returns {JSX.Element}
 */
import CardSlider from "@/components/card-slider"

export default function Home() {
  return (
    // Main container with responsive padding
    // - Mobile: px-4 py-4
    // - Tablet: px-6 py-6
    // - Desktop: px-8 py-8
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Responsive heading with different sizes for mobile, tablet, and desktop */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center">
        Powered by DeTA
      </h1>
      {/* Card Slider Component */}
      <CardSlider />
    </main>
  )
}

