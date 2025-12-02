import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Moon, Sun, Maximize2, Minimize2, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

interface FloatingMenuProps {
  onDownload: () => void
  isFocusMode: boolean
  toggleFocusMode: () => void
}

export function FloatingMenu({ onDownload, isFocusMode, toggleFocusMode }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleFocusMode}
              className="rounded-full shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
            >
              {isFocusMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="secondary"
              size="icon"
              onClick={onDownload}
              className="rounded-full shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              title="Download Markdown"
            >
              <Download className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full shadow-sm transition-all duration-300 ${
          isOpen ? 'bg-accent text-accent-foreground rotate-90' : 'hover:bg-accent/50'
        }`}
      >
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </div>
  )
}
