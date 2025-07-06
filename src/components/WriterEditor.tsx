import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'

const WriteEditor = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, 
    },
    orderedList: { 
      keepMarks: true,
      keepAttributes: false,
    },
    }),
  ListItem,
]

const WriterEditor = () => {
  return (
    <EditorProvider
      slotBefore={<WriteEditor />}
      extensions={extensions}
    ></EditorProvider>
  )
}

export default WriterEditor
