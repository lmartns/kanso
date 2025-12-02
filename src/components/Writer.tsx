import '../index.css'
import { Editor, EditorContent } from '@tiptap/react'

const Writer = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <EditorContent 
      editor={editor} 
      className="w-full h-full min-h-[60vh] outline-none"
    />
  )
}

export default Writer
