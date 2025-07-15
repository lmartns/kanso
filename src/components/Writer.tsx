import { CustomCaretExtension } from '@/lib/extensions/custom-caret'
import '../index.css'

import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [
  StarterKit.configure({
    history: false,
  }),
  CustomCaretExtension,
]

const Writer = () => {
  return (
    <EditorProvider
      extensions={extensions}
      autofocus
      content="<p></p>"
    ></EditorProvider>
  )
}

export default Writer
