import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface StatusBarProps {
  wordCount: number
  isSaving: boolean
  lastSaved: Date | null
}

export function StatusBar({ wordCount, isSaving, lastSaved }: StatusBarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-4 text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <span>{wordCount} words</span>
      </div>
      
      <div className="w-px h-3 bg-border" />
      
      <div className="flex items-center gap-1.5">
        {isSaving ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-3 w-3 text-green-500/70" />
            <span>Saved {lastSaved ? lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
          </>
        )}
      </div>
    </motion.div>
  )
}
