import '../index.css'
import { Editor, EditorContent } from '@tiptap/react'

const Writer = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return <EditorContent editor={editor} />
}

export default Writer
