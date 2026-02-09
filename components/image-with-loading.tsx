"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageWithLoadingProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function ImageWithLoading({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Base64 encoded transparent pixel
  const blurDataURL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-all duration-500 ease-in-out",
          isLoading ? "scale-110 blur-xl grayscale" : "scale-100 blur-0 grayscale-0",
          hasError ? "hidden" : "block"
        )}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataURL}
        quality={75}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  )
}
