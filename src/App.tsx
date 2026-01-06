import Writer from './components/Writer'
import TurndownService from 'turndown'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/react'
import { generateFileName } from './lib/utils/generate-file-name'
import { useEffect, useState } from 'react'
import { FloatingMenu } from './components/FloatingMenu'
import { StatusBar } from './components/StatusBar'
import { WelcomeScreen } from './components/WelcomeScreen'
import { cn } from './lib/utils'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Placeholder from '@tiptap/extension-placeholder'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

function App() {
  const savedContent = localStorage.getItem('kanso-editor-content')
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  const [isFocused, setIsFocused] = useState(false)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder: '...',
      }),
    ],
    autofocus: isMobile ? false : 'end',
    content: savedContent ? JSON.parse(savedContent) : '',
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none',
        'data-testid': 'editor',
      },
    },
    onUpdate: ({ editor }) => {
      setWordCount(editor.storage.characterCount?.words() || 0)
      setIsSaving(true)
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    ...(isMobile ? {} : {
      onBlur: () => {
        setIsFocused(false)
      },
    }),
  })

  useEffect(() => {
    if (editor) {
      setWordCount(editor.state.doc.textContent.split(/\s+/).filter(w => w.length > 0).length)
    }
  }, [editor?.state.doc.content, editor])

  useEffect(() => {
    if (!editor) return

    const debounceTimer = setTimeout(() => {
      const json = editor.getJSON()
      localStorage.setItem('kanso-editor-content', JSON.stringify(json))
      setIsSaving(false)
      setLastSaved(new Date())
    }, 1000)

    return () => clearTimeout(debounceTimer)
  }, [editor?.state.doc.content, editor])

  const handleDownloadMD = () => {
    if (!editor) return

    const turndownService = new TurndownService()
    const markdown = turndownService.turndown(editor.getHTML())

    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = generateFileName()
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className={cn(
      "min-h-screen bg-background transition-colors duration-700 ease-in-out relative overflow-hidden",
      isFocusMode && "cursor-none"
    )}>
      <WelcomeScreen />

      <div
        className={cn(
          "transition-opacity duration-500",
          isFocusMode && isFocused ? "opacity-0 hover:opacity-100" : "opacity-100"
        )}
      >
        <FloatingMenu
          onDownload={handleDownloadMD}
          isFocusMode={isFocusMode}
          toggleFocusMode={() => setIsFocusMode(!isFocusMode)}
        />
      </div>

      <div className={cn(
        "mx-auto max-w-3xl px-6 py-24 md:py-32 animate-fade-in transition-all duration-700",
        isMobile ? 'pb-40' : '',
        isFocusMode ? "py-32 md:py-48" : ""
      )}>
        <Writer editor={editor} />
      </div>

      <div
        className={cn(
          "transition-opacity duration-500",
          isFocusMode && isFocused ? "opacity-0" : "opacity-100"
        )}
      >
        <StatusBar
          wordCount={wordCount}
          isSaving={isSaving}
          lastSaved={lastSaved}
        />
      </div>
    </main>
  )
}

export default App