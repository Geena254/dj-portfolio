"use client"

import { motion } from "framer-motion"
import LoadingSpinner from "./loading-spinner"

export default function PageLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">SHANGATATU</h1>
          <p className="text-gray-400">Loading...</p>
        </motion.div>
        <LoadingSpinner size="lg" />
      </div>
    </motion.div>
  )
}
