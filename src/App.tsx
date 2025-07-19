import Writer from './components/Writer'
import jsPDF from 'jspdf'
import TurndownService from 'turndown'
import { CustomCaretExtension } from './lib/extensions/custom-caret'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/react'

const extensions = [
  StarterKit.configure({
    history: false,
  }),
  CustomCaretExtension,
]

function App() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true,
      }),
      CustomCaretExtension,
    ],
    autofocus: true,
    content: '',
    editorProps: {
      attributes: {
        class: 'prose-mirror-editor',
      },
    },
  })

  const handleDownloadMD = () => {
    if (!editor) return

    const turndownService = new TurndownService()
    const markdown = turndownService.turndown(editor.getHTML())

    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'documento.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-4xl justify-end gap-2 p-4">
        <button onClick={handleDownloadMD} className="btn btn-ghost">
          Download .MD
        </button>
      </div>

      <div className="writer-container">
        <Writer editor={editor} />
      </div>
    </main>
  )
}

export default App
