"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Download, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

interface PdfViewerModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
}

export default function PdfViewerModal({ isOpen, onClose, pdfUrl }: PdfViewerModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      // Reset loading state when modal opens
      const timer = setTimeout(() => setIsLoading(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full max-w-7xl max-h-[95vh] m-4 bg-black rounded-2xl border border-secondary/20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-secondary/20 bg-black/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary/10 transition-colors text-secondary hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold gradient-text">Rate Card</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                download="Shangatatu-Rate-Card.pdf"
                className="p-2 rounded-lg hover:bg-secondary/10 transition-colors text-secondary hover:text-white"
                title="Download PDF"
              >
                <Download className="h-5 w-5" />
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary/10 transition-colors text-secondary hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="relative w-full h-[calc(100%-80px)] overflow-auto">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-secondary"></div>
                  <p className="text-gray-400">Loading rate card...</p>
                </div>
              </div>
            )}
            
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title="Shangatatu Rate Card"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false)
                console.error("Failed to load PDF")
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
