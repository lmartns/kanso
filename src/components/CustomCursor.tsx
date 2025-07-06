import { useState, useRef, useEffect } from 'react'

const editorProseClasses = `
  prose dark:prose-invert 
  prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground
  prose-strong:text-foreground prose-em:text-foreground
  prose-code:text-foreground
  text-xl max-w-2xl w-full
  focus:outline-none
`

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({
    top: 0,
    left: 0,
    visible: false,
  })

  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    const updateCursorPosition = () => {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) {
        setCursorPosition((pos) => ({ ...pos, visible: false }))
        return
      }

      const range = selection.getRangeAt(0)
      const isCollapsed = range.collapsed

      if (isCollapsed) {
        let rect
        if (range.getClientRects().length > 0) {
          rect = range.getClientRects()[0]
        } else {
          const span = document.createElement('span')
          span.textContent = '\u200b'
          range.insertNode(span)
          rect = span.getBoundingClientRect()
          span.remove()
        }

        const editorRect = editor.getBoundingClientRect()

        setCursorPosition({
          top: rect.top - editorRect.top,
          left: rect.left - editorRect.left,
          visible: true,
        })
      } else {
        setCursorPosition((pos) => ({ ...pos, visible: false }))
      }
    }

    document.addEventListener('selectionchange', updateCursorPosition)
    editor.addEventListener('focus', updateCursorPosition)
    editor.addEventListener('blur', () =>
      setCursorPosition((pos) => ({ ...pos, visible: false })),
    )
    editor.addEventListener('click', updateCursorPosition)

    return () => {
      document.removeEventListener('selectionchange', updateCursorPosition)
    }
  }, [])

  return (
    <div className="relative w-full max-w-2xl">
      {cursorPosition.visible && (
        <span
          className="custom-cursor"
          style={{
            top: `${cursorPosition.top}px`,
            left: `${cursorPosition.left}px`,
          }}
        />
      )}

      <div
        ref={editorRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className={`${editorProseClasses} native-cursor-hidden`}
        dangerouslySetInnerHTML={{
          __html: '<h3>Kanso</h3><p>Comece a escrever...</p>',
        }}
      />
    </div>
  )
}

export default CustomCursor
