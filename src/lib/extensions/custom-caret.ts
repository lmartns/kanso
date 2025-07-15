import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

const caretState = {
  isBlinking: false,
}

export const CustomCaretExtension = Extension.create({
  name: 'customCaret',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('customCaret'),
        props: {
          decorations(state) {
            const { selection } = state
            if (!selection.empty || !selection.anchor) {
              return DecorationSet.empty
            }

            const caretPos = selection.anchor
            const decoration = Decoration.widget(caretPos, () => {
              const caret = document.createElement('span')
              caret.className = `custom-caret ${
                caretState.isBlinking ? 'blinking' : ''
              }`
              return caret
            })

            return DecorationSet.create(state.doc, [decoration])
          },
        },
      }),
    ]
  },
})
