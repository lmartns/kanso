import Writer from './components/Writer'
import TurndownService from 'turndown'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/react'
import { Button } from './components/ui/button'
import { FileDown } from 'lucide-react'
import { generateFileName } from './lib/utils/generate-file-name'
import { useEffect } from 'react'

function App() {
  const savedContent = localStorage.getItem('kanso-editor-content')
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: isMobile ? false : 'end',
    content: savedContent ? JSON.parse(savedContent) : '',
    editorProps: {
      attributes: {
        class: 'prose-mirror-editor',
        'data-testid': 'editor',
      },
    },
    ...(isMobile ? {} : {
      onBlur: () => {
        setTimeout(() => {
          if (editor && !editor.isFocused) {
            editor.chain().focus().run()
          }
        }, 1500)
      },
    }),
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

      <div className={`writer-container ${isMobile ? 'mobile-writer' : ''}`}>
        <Writer editor={editor} />
      </div>
    </main>
  )
}

export default App