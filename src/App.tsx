import Writer from './components/Writer'
import TurndownService from 'turndown'
import { CustomCaretExtension } from './lib/extensions/custom-caret'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/react'
import { Button } from './components/ui/button'
import { FileDown } from 'lucide-react'
import { generateFileName } from './lib/utils/generate-file-name'
import { useEffect, useRef } from 'react'

function App() {
  const savedContent = localStorage.getItem('kanso-editor-content')
  const focusTimeout = useRef<number | null>(null)

  const editor = useEditor({
    extensions: [StarterKit, CustomCaretExtension],
    autofocus: 'end',
    content: savedContent ? JSON.parse(savedContent) : '',
    editorProps: {
      attributes: {
        class: 'prose-mirror-editor',
      },
    },
    onBlur: () => {
      focusTimeout.current = window.setTimeout(() => {
        if (
          editor &&
          !editor.isFocused
        ) {
          editor.chain().focus().run()
        }
      }, 2000)
    },
    onFocus: () => {
      if (focusTimeout.current) {
        clearTimeout(focusTimeout.current)
      }
    },
  })

  useEffect(() => {
    if (!editor) {
      return
    }

    const debounceTimer = setTimeout(() => {
      const json = editor.getJSON()
      localStorage.setItem('kanso-editor-content', JSON.stringify(json))
    }, 750)

    return () => {
      clearTimeout(debounceTimer)
    }
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
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-4xl justify-end gap-2 p-4">
        <Button variant="ghost" onClick={handleDownloadMD}>
          <FileDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="writer-container">
        <Writer editor={editor} />
      </div>
    </main>
  )
}

export default App
