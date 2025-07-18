"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionTransitionProps {
  children: ReactNode
  delay?: number
}

export default function SectionTransition({ children, delay = 0 }: SectionTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
