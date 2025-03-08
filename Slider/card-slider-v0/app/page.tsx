import CardSlider from "@/components/card-slider"

export default function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center">
        Card Slider with NocoDB
      </h1>
      <CardSlider />
    </main>
  )
}

