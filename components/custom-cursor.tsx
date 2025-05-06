"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setTimeout(() => {
        setDotPosition({ x: e.clientX, y: e.clientY })
      }, 50)
    }

    const handlePointer = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y)
      setIsPointer(
        hoveredElement?.tagName === "BUTTON" ||
          hoveredElement?.tagName === "A" ||
          hoveredElement?.closest("button") !== null ||
          hoveredElement?.closest("a") !== null,
      )
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousemove", handlePointer)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousemove", handlePointer)
    }
  }, [position.x, position.y])

  return (
    <>
      <div
        className="cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? "50px" : "20px",
          height: isPointer ? "50px" : "20px",
          opacity: position.x === 0 ? 0 : 1,
        }}
      />
      <div
        className="cursor-dot"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
          opacity: dotPosition.x === 0 ? 0 : 1,
        }}
      />
    </>
  )
}
