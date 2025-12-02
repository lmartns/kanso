import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background pointer-events-none"
        >
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif font-medium text-foreground tracking-tight"
            >
              Kanso
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-muted-foreground font-sans text-sm tracking-widest uppercase"
            >
              Simplicity • Focus • Flow
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
